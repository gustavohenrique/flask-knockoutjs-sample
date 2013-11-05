# -*- coding: utf-8 -*-
import os
import tempfile
from flask import request
from flask_login import current_user, login_required

from api import app, models
from api.helpers import homebank, csv, view


@app.route("/api/v1/importing/homebank", methods=['POST'])
@login_required
def homebank_importing():
    try:
        f = request.files['filename']
        temp_dir = current_user.token
        xml = os.path.join(tempfile.gettempdir(), temp_dir)
        f.save(xml)
        homebank.create(file=xml, user=current_user)
        return view.response()
    except Exception as e:
        return view.response(status=500, messages=[e.message])


@app.route("/api/v1/importing/csv", methods=['POST'])
@login_required
def csv_importing():
    try:
        f = request.files['filename']
        temp_dir = current_user.token
        csv_file = os.path.join(tempfile.gettempdir(), temp_dir)
        f.save(csv_file)
        template = request.values.get('template')
        account_id = request.values.get('account')
        account = models.Account.query.filter_by(id=account_id).first()
        data = csv.create(file=csv_file, user=current_user, template=template, account=account)
        status = 500 if len(data) == 0 else 200
        return view.response(status=status, fields=data)
    except Exception as e:
        return view.response(status=500, messages=[e.message])
