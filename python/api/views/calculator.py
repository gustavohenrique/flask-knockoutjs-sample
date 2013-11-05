# -*- coding: utf-8 -*-
from datetime import date
from decimal import Decimal
from flask import request, json
from flask_login import current_user, login_required

from api import app, models, utils
from api.helpers import view


@app.route('/api/v1/calculator/calculate', methods=['POST'])
@login_required
def calculate():
    try:
        item = json.loads(request.data)

        today = utils.from_date(date.today())
        future_date = item.get('date', today)

        account_id = int(item.get('account', 0))
        account = models.Account.query.filter_by(id=account_id).first()
        if not account:
            return view.response(status=404, messages=['Account not found.'])

        qry = 'user_id="%s" and account_id="%s" and transaction_date<="%s"' % (current_user.id, account_id, future_date)
        transactions = models.Transaction.query.filter(qry).all()
        balance = 0
        for transaction in transactions:
            balance = balance + transaction.amount

        qry = 'user_id="%s" and account_id="%s" and transaction_date<="%s"' % (current_user.id, account_id, future_date)
        scheduled_transactions = models.ScheduledTransaction.query.filter(qry).all()
        income = 0
        expense = 0
        for scheduled in scheduled_transactions:
            if scheduled.amount > 0:
                income = income + scheduled.amount
            else:
                expense = expense + scheduled.amount

        other_transactions = item.get('transactions', [])
        other_amount = 0
        for other in other_transactions:
            try:
                raw_date = other.get('transaction_date')
                dt = utils.to_date(raw_date)
                if dt <= utils.to_date(future_date):
                    other_amount += Decimal(other.get('amount', 0))
            except:
                pass

        amount = balance + income + expense + other_amount

        result = {
            'balance': balance,
            'income': income,
            'expense': expense,
            'transactions': other_amount,
            'amount': amount
        }

        return view.response(fields=result, total=1)
    except Exception as e:
        return view.response(status=500, messages=[e.message])
