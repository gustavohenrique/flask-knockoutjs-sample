# -*- coding: utf-8 -*-
from flask import request, json
from flask_login import login_required, login_user, logout_user

from api import app, models
from api.helpers import view


@app.route("/api/v1/authentication/login", methods=['POST'])
def login():
    try:
        item = json.loads(request.data)
        username = item.get('username', '')
        password = models.User.encrypt(item.get('password', ''))
        user = models.User.query.filter_by(username=username, password=password).first()
        login_user(user)
        return view.response()
    except Exception as e:
        # models.session.rollback()
        return view.response(status=401, messages=[e.message])


@app.route("/api/v1/authentication/register", methods=['POST'])
def register():
    try:
        item = json.loads(request.data)
        username = item.get('username', '')
        if username == '':
            raise Exception(u'The username is blank')

        if models.User.query.filter_by(username=username).count() > 0:
            raise Exception(u'The username already exists')

        password = item.get('password', '')
        if len(password) < 5 or len(password) > 16:
            raise Exception(u'Password must be 6-16 characters')

        user = models.User(username='', password='')
        user.from_dict(item)
        user.get_session.commit()
        return view.response(total=1, fields={'username': user.username, 'token': user.token})
    except Exception as e:
        models.session.rollback()
        return view.response(status=500, messages=[e.message])


@app.route("/api/v1/authentication/logout")
@login_required
def logout():
    logout_user()
    return view.response()


@app.route("/api/v1/authentication/check")
@login_required
def is_authenticated():
    return view.response()
