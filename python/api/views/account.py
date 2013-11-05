# -*- coding: utf-8 -*-
from flask import request
from flask_login import login_required

from api import app, models
from api.helpers import view


@app.route('/api/v1/accounts')
@login_required
def list_accounts():
    return view.get_items(models.Account)


@app.route('/api/v1/account/save', methods=['POST', 'PUT'])
@login_required
def add_or_update_account():
    return view.add_or_update_items(models.Account, request)


@app.route('/api/v1/account/delete/<item_id>')
@login_required
def delete_account(item_id):
    return view.delete_item(models.Account, item_id)
