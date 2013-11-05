# -*- coding: utf-8 -*-
from flask import Flask
import argparse
import os


webclient_dir = os.path.join(os.path.dirname(__file__), 'webclient')
if os.path.exists(webclient_dir):
    template_dir = os.path.join(webclient_dir, 'templates')
    app = Flask(__name__, template_folder=template_dir)
else:
    app = Flask(__name__)

#app.config.from_envvar('POUPANIQUEL_SETTINGS') #, silent=True)

profile = 'settings.TestingConfig'
try:
    parser = argparse.ArgumentParser(description='You must pass an environment.')
    parser.add_argument('--env', dest='environment', help='name', default='test')
    args = parser.parse_args()

    environment = args.environment

    if environment == 'dev':
        profile = 'settings.DevelopmentConfig'
    else:
        profile = 'settings.ProductionConfig'
except:
    pass

print 'Running %s' % profile

app.config.from_object(profile)
app.config.update({
    'DATE_FORMAT': '%Y-%m-%d',
    #'DATE_FORMAT': '%Y-%m-%dT%H:%M:%S.%fZ',
})

# import views
from api import *
from webclient.views import *


def init_db():
    from api import models
    models.setup_all()
    models.create_all()

if __name__ == "__main__":
    init_db()
    app.run()
    #app.run('host='0.0.0.0')
