# -*- coding: utf-8 -*-
import unittest
import unicodecsv as csv
from api.helpers import csv as csvimporting
from tests import helper
from os.path import join
from api import models


class CsvTest(unittest.TestCase):

    def setUp(self):
        models.setup_all()
        models.create_all()
        # helper.clean_initial_data()
        self.account = helper.fixture(cls=models.Account, persist=True, key=u'21323', name=u'sdhkjhiu')
        self.user = helper.fixture(cls=models.User, persist=True, username=u'root', password='root123')
        self.resources_dir = helper.resources_dir()

    def tearDown(self):
        helper.clean_initial_data()

    def test_should_throws_IOError_if_file_not_found(self):
        try:
            csvimporting.create(file='not_found.csv', user=self.user)
            self.fail()
        except:
            pass

    def test_get_data_using_default_dialect(self):
        f = join(self.resources_dir, 'itau.csv')
        result = csvimporting.create(file=f, user=self.user)
        self.assertEqual(15, len(result))

        first_data = result[0]
        self.assertEqual('02/08/2012', first_data.get('field1'))
        self.assertEqual('INT PAG TIT 175178842808', first_data.get('field2'))
        self.assertEqual('-241,49', first_data.get('field3'))

    def test_get_data_setting_custom_dialect(self):
        dialect = csv.excel()
        dialect.delimiter = ';'
        f = join(self.resources_dir, 'itau.csv')
        result = csvimporting.create(file=f, user=self.user, dialect=dialect)
        self.assertEqual(15, len(result))

        first_data = result[0]
        self.assertEqual('02/08/2012', first_data.get('field1'))
        self.assertEqual('INT PAG TIT 175178842808', first_data.get('field2'))
        self.assertEqual('-241,49', first_data.get('field3'))

    def test_get_data_from_file_with_ascii_encoding(self):
        f = join(self.resources_dir, 'bradescopj.csv')
        result = csvimporting.create(file=f, user=self.user)
        self.assertEqual(6, len(result))

    def test_import_using_itaupf_template_skipping_already_exists(self):
        f = join(self.resources_dir, 'itau.csv')
        result = csvimporting.create(file=f, user=self.user, template='itaupf', account=self.account)
        self.assertEqual(15, len(result))

        transactions = models.Transaction.query.all()
        self.assertEqual(15, len(transactions))

        transaction = transactions[1]
        self.assertEqual(self.account.name, transaction.account.name)
        self.assertEqual('02/08/2012', helper.format_date(transaction.transaction_date, '%d/%m/%Y'))
        self.assertEqual('INT LIGHT 6104281', transaction.description)
        self.assertEqual(-79.61, round(transaction.amount, 2))
        self.assertEqual(u'root', transaction.user.username)

        result = csvimporting.create(file=f, user=self.user, template='itaupf', account=self.account)
        self.assertEqual(15, len(result))

        transactions = models.Transaction.query.all()
        self.assertEqual(15, len(transactions))

    def test_import_using_bradescopj_template_skipping_already_exists(self):
        f = join(self.resources_dir, 'bradescopj.csv')
        result = csvimporting.create(file=f, user=self.user, template='bradescopj')
        self.assertEqual(6, len(result))

        transactions = models.Transaction.query.all()
        self.assertEqual(4, len(transactions))

        transaction = transactions[0]
        self.assertEqual('01/08/2012', helper.format_date(transaction.transaction_date, '%d/%m/%Y'))
        self.assertEqual('CARTAO VISA ELECTRON SENDAS FL 1684', transaction.description)
        self.assertEqual(-12.42, round(transaction.amount, 2))
        self.assertEqual(u'root', transaction.user.username)

        result = csvimporting.create(file=f, user=self.user, template='bradescopj')
        self.assertEqual(6, len(result))

        transactions = models.Transaction.query.all()
        self.assertEqual(4, len(transactions))

    def test_import_using_itaupf_template_but_bradesco_file(self):
        f = join(self.resources_dir, 'bradescopj.csv')
        try:
            csvimporting.create(file=f, user=self.user, template='itaupf')
            self.fail()
        except:
            pass

    def test_import_using_bradescopj_template_but_itau_file(self):
        f = join(self.resources_dir, 'itau.csv')
        try:
            csvimporting.create(file=f, user=self.user, template='bradescopj')
            self.fail()
        except:
            pass
