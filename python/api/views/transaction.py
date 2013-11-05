# -*- coding: utf-8 -*-
from decimal import Decimal
from sqlalchemy.sql.expression import desc
from flask import request, json
from flask_login import current_user, login_required

from api import app, models, utils
from api.helpers import view


@app.route('/api/v1/transactions')
@login_required
def list_transactions():
    qry = models.Transaction.query.order_by('transaction_date', 'description')
    if 'desc' == request.args.get('ordering', 'asc'):
        qry = models.Transaction.query.order_by(desc('transaction_date'))
    items = qry.filter_by(user_id=current_user.id).all()

    fields = []
    if len(items) > 0:
        for item in items:
            fields.append(item.to_dict())

    return view.response(fields=fields)


@app.route('/api/v1/transaction/save', methods=['POST', 'PUT'])
@login_required
def add_or_update_transaction():
    try:
        items = json.loads(request.data)
        messages = []
        for item in items:
            item.update({'user_id': current_user.id})
            amount = Decimal(item.get('amount', '0'))
            item.update({'amount': amount})
            transaction_date = utils.to_date(item.get('transaction_date'))
            item.update({'transaction_date': transaction_date})
            view.save_item(models.Transaction, item)
    except Exception as e:
        messages.append(e.message)

    if len(messages) > 0:
        return view.response(status=500, messages=[e.message])
    return view.response()


@app.route('/api/v1/transaction/delete/<item_id>')
@login_required
def delete_transaction(item_id):
    return view.delete_item(models.Transaction, item_id)
