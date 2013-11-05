# -*- coding: utf-8 -*-
from flask import request
from flask_login import current_user, login_required

from api import app, models, utils
from api.helpers import view


@app.route('/api/v1/reports/balance')
@login_required
def account_summary():
    try:
        start_date = utils.to_date(request.args.get('start'))
        end_date = utils.to_date(request.args.get('end'))

        account_id = request.args.get('account')
        # account = models.Account.query.filter_by(id=account_id).first()

        qry = 'user_id=%s and account_id=%s and transaction_date >= "%s" and transaction_date <= "%s"' % (current_user.id, account_id, start_date, end_date)
        items = models.Transaction.query.filter(qry).order_by('transaction_date').all()

        fields = []
        data = {'date': None, 'balance': 0}
        year = None
        amount = 0
        for item in items:
            year = item.transaction_date.year
            month = item.transaction_date.month

            dt = '%d/%d' % (month, year)
            if data.get('date') == dt:
                amount = data.get('balance') + item.amount
                data.update({
                    'balance': amount
                })
            else:
                data = {'date': dt, 'balance': item.amount + amount}
                fields.append(data)

        #status = 404 if len(fields) == 0 else 200
        return view.response(fields=fields)
    except Exception, e:
        return view.response(status=500, messages=[e.message])
