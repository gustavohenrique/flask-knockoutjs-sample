# -*- coding: utf-8 -*-
from flask import request
from flask_login import login_required

from api import app, models
from api.helpers import view


@app.route('/api/v1/payees')
@login_required
def list_payees():
    return view.get_items(models.Payee)


@app.route('/api/v1/payee/save', methods=['POST', 'PUT'])
@login_required
def add_or_update_payee():
    return view.add_or_update_items(models.Payee, request)


@app.route('/api/v1/payee/delete/<item_id>')
@login_required
def delete_payee(item_id):
    return view.delete_item(models.Payee, item_id)
