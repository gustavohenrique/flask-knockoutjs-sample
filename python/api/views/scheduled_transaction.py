# -*- coding: utf-8 -*-
from datetime import date
from decimal import Decimal
from dateutil.relativedelta import relativedelta
from flask import request, json
from flask_login import current_user, login_required

from api import app, models, utils
from api.helpers import view


@app.route('/api/v1/scheduled/transaction/save', methods=['POST'])
@login_required
def add_or_update_scheduled_transaction():
    try:
        item = json.loads(request.data)
        # import ipdb; ipdb.set_trace()
        frequency = int(item.get('frequency', 1))
        number_replications = int(item.get('number_replications', 1))

        if frequency < 1 or number_replications < 1:
            return view.response(status=500, messages=['The frequency and the number of replications have to be bigger than zero.'])

        unit_replications = item.get('unit_replications')
        transaction_date = utils.to_date(item.get('transaction_date', utils.from_date(date.today())))

        for i in range(frequency):
            if i > 0:
                if unit_replications == 'weeks':
                    transaction_date = transaction_date + relativedelta(weeks=+number_replications)
                elif unit_replications == 'months':
                    transaction_date = transaction_date + relativedelta(months=+number_replications)
                elif unit_replications == 'years':
                    transaction_date = transaction_date + relativedelta(years=+number_replications)

            item.update({'transaction_date': transaction_date})
            item.update({'user_id': current_user.id})
            view.save_item(models.ScheduledTransaction, item)

        return view.response(fields=item, total=frequency)
    except Exception as e:
        return view.response(status=500, messages=[e.message])


@app.route('/api/v1/scheduled/transactions')
@app.route('/api/v1/scheduled/transactions/<upcoming>', endpoint='upcoming')
@login_required
def list_scheduled_transactions(upcoming=False):
    try:
        qry = models.ScheduledTransaction.query.order_by('transaction_date').filter_by(user_id=current_user.id)
        if upcoming:
            today = date.today()
            next_month = today + relativedelta(months=+1)
            where_clausule = 'transaction_date >= "%s" and transaction_date <= "%s"' % (today, next_month)
            qry = qry.filter(where_clausule)

        items = qry.group_by('description').all()
        fields = []
        if len(items) > 0:
            for item in items:
                fields.append(item.to_dict())

        return view.response(fields=fields)
    except Exception, e:
        return view.response(status=500, messages=[e.message])


@app.route('/api/v1/scheduled/transaction/delete/<item_key>')
@login_required
def delete_scheduled_transactions(item_key):
    items = models.ScheduledTransaction.query.filter_by(user_id=current_user.id, key=item_key).all()
    if len(items) == 0:
        return view.response(status=404)

    for item in items:
        item.delete()
        item.get_session.commit()
    return view.response(success=True)


@app.route('/api/v1/scheduled/transaction/finish', methods=['POST'])
@login_required
def finish_scheduled_transaction():
    try:
        item = json.loads(request.data)
        scheduled = models.ScheduledTransaction.query.filter_by(id=item.get('id'), user_id=current_user.id, key=item.get('key')).first()

        transaction = models.Transaction()
        transaction.description = item.get('description', scheduled.description)
        transaction.amount = Decimal(item.get('amount', scheduled.amount))
        transaction.transaction_date = date.today()
        transaction.account_id = scheduled.account_id
        transaction.category_id = scheduled.category_id
        transaction.payee_id = scheduled.payee_id
        transaction.get_session.commit()

        scheduled.delete()

        return view.response(fields=[transaction.to_dict()])
    except Exception, e:
        models.session.rollback()
        return view.response(status=500, messages=[e.message])
