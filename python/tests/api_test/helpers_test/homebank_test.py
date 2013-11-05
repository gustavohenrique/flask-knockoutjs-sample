import unittest
import datetime

from api import models
from api.helpers import homebank
from tests import helper


class HomeBankTest(unittest.TestCase):

    def setUp(self):
        models.setup_all()
        models.create_all()
        helper.clean_initial_data()
        xml = helper.resources_dir() + '/homebank-sample.xhb'
        self.user = helper.fixture(cls=models.User, persist=True, username=u'root', password='root123')
        homebank.create(file=xml, user=self.user)

    def tearDown(self):
        # clean database
        helper.clean_initial_data()

    def test_parse_homebank_file(self):
        # accounts
        accounts = models.Account.query.all()
        self.assertEqual(3, len(accounts))
        first_account = accounts[0]
        self.assertEqual('1', first_account.key)
        self.assertEqual('Citibank', first_account.name)

        # payees
        payees = models.Payee.query.order_by('id').all()
        self.assertEqual(10, len(payees))
        first_payee = payees[0]
        self.assertEqual('1', first_payee.key)
        self.assertEqual('Wallmart', first_payee.name)

        # categories
        categories = models.Category.query.order_by('id').all()
        self.assertEqual(10, len(categories))
        first_category = categories[0]
        self.assertEqual('3', first_category.key)
        self.assertEqual('Food', first_category.name)

        # transactions
        transactions = models.Transaction.query.order_by('transaction_date').all()
        self.assertEqual(5, len(transactions))
        first_transaction = transactions[0]
        self.assertEqual('Buy chocolate', first_transaction.description)
        self.assertEqual(-1.53, round(first_transaction.amount, 2))
        self.assertEqual(datetime.date(2011, 7, 26), first_transaction.transaction_date)
        self.assertEqual('1', first_transaction.account.key)
        self.assertEqual('6', first_transaction.payee.key)
        self.assertEqual('3', first_transaction.category.key)
