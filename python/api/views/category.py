# -*- coding: utf-8 -*-
from flask import request
from flask_login import login_required

from api import app, models
from api.helpers import view


@app.route('/api/v1/categories')
@login_required
def list_categories():
    return view.get_items(models.Category)


@app.route('/api/v1/category/save', methods=['POST', 'PUT'])
@login_required
def add_or_update_category():
    return view.add_or_update_items(models.Category, request)


@app.route('/api/v1/category/delete/<item_id>')
@login_required
def delete_category(item_id):
    return view.delete_item(models.Category, item_id)
