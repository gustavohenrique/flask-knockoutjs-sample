# -*- coding: utf-8 -*-
import run
app = run.app

from flask_login import LoginManager
login_manager = LoginManager()
login_manager.setup_app(app)


@login_manager.user_loader
def load_user(user_id):
    from api.models import User
    return User.query.filter_by(id=user_id).first()


@login_manager.unauthorized_handler
def unauthorized():
    from api.helpers import view
    return view.response(status=401, messages=['Access denied'])

from api.views import *
