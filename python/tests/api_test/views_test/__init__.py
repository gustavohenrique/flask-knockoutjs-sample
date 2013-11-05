# -*- coding: utf-8 -*-
import unittest
import api

from api import models
from tests import helper as h


class TestCase(unittest.TestCase):

    DATE_FORMAT = '%Y-%m-%d'
    helper = h
    response_data = {}
    _fields = None
    _fieldname = ''
    _qry = ''
    _value_to_compare = None

    def setUp(self):
        models.setup_all()
        models.create_all()
        self.helper.clean_initial_data()
        self.helper.load_initial_data()
        self.app = api.app.test_client()
        self.login()

    def tearDown(self):
        self.helper.clean_initial_data()

    def login(self):
        self.app.post('/api/v1/authentication/login', data='{"username": "admin", "password": "admin"}', follow_redirects=True)

    def login_tux(self):
        self.app.post('/api/v1/authentication/login', data='{"username": "tux", "password": "tux123"}', follow_redirects=True)

    def assertTotal(self, value):
        self._value_to_compare = value
        total = self.response_data.get('total', '')
        self.equal(total)

    def assertField(self, fieldname):
        self._fields = self.response_data.get('fields')
        self._fieldname = fieldname
        return self

    def assertData(self, data):
        column = data.keys()[0]
        value = data.get(column)
        self._qry = '%s="%s"' % (column, value)
        return self.assertField(data)

    def inPos(self, pos):
        self._value_to_compare = self._fields[pos].get(self._fieldname)
        return self

    def inModel(self, cls):
        self._cls = cls
        return self

    def equal(self, value):
        if isinstance(self._fields, dict):
            self._value_to_compare = self._fields.get(self._fieldname)
        self.assertEqual(value, self._value_to_compare)

    def isNotNull(self):
        self.assertIsNotNone(self._value_to_compare)

    def isPersisted(self):
        assert self._cls.query.filter(self._qry).first()

    def isNotPersisted(self):
        self.assertEqual(0, self._cls.query.filter(self._qry).count())

    def hasId(self, old_id):
        obj = self._cls.query.filter(self._qry).first()
        self.assertEqual(old_id, obj.id)
