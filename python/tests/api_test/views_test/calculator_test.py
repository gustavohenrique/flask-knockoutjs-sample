import unittest
from decimal import Decimal

from api import app, models
from tests import helper


class CalculatorTest(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self._load_data()
        self._login()

    def tearDown(self):
        helper.clean_initial_data()

    def test_calculate_using_invalid_date(self):
        request_data = '''{
            "date": "2010",
            "account": %s,
            "transactions": [{
                "transaction_date": "2012-12-01",
                "description": "Jenkins conference Sao Paulo, Brazil",
                "amount": "-300.0"
            }]
        }''' % self.account.id

        response = self.app.post('/api/v1/calculator/calculate', data=request_data)
        self.assertEqual(200, response.status_code)

    def test_calculate_total_amount_on_specific_date(self):
        request_data = '''{
            "date": "2012-12-24",
            "account": %s,
            "transactions": [{
                "transaction_date": "2012-12-01",
                "description": "Jenkins conference Sao Paulo, Brazil",
                "amount": "-300.0"
            }, {
                "transaction_date": "2012-12-31",
                "description": "Reveillon party",
                "amount": "-200.0"
            }]
        }''' % self.account.id

        response = self.app.post('/api/v1/calculator/calculate', data=request_data)
        self.assertEqual(200, response.status_code)

        data = helper.from_json(response.data)
        self.assertEqual(1, data.get('total'))

        fields = data.get('fields')
        self.assertEqual(-249.9, fields.get('balance'))
        self.assertEqual(2000.0, fields.get('income'))
        self.assertEqual(-800.0, fields.get('expense'))
        self.assertEqual(-300.0, fields.get('transactions'))
        self.assertEqual(650.1, fields.get('amount'))

    def test_should_return_404_if_account_doesnt_exist(self):
        request_data = '''{
            "date": "2012-12-24",
            "account": 333,
            "transactions": [{
                "transaction_date": "2012-12-01",
                "description": "Jenkins conference Sao Paulo, Brazil",
                "amount": "-300.0"
            }]
        }'''

        response = self.app.post('/api/v1/calculator/calculate', data=request_data)
        self.assertEqual(404, response.status_code)

    def test_calculate_if_date_is_older(self):
        request_data = '''{
            "date": "2010-01-01",
            "account": %s,
            "transactions": [{
                "transaction_date": "2012-12-01",
                "description": "Jenkins conference Sao Paulo, Brazil",
                "amount": "-300.0"
            }]
        }''' % self.account.id

        response = self.app.post('/api/v1/calculator/calculate', data=request_data)
        self.assertEqual(200, response.status_code)

        data = helper.from_json(response.data)
        self.assertEqual(1, data.get('total'))

        fields = data.get('fields')
        self.assertEqual(0, fields.get('balance'))
        self.assertEqual(0, fields.get('income'))
        self.assertEqual(0, fields.get('expense'))
        self.assertEqual(0, fields.get('transactions'))
        self.assertEqual(0, fields.get('amount'))

    def _login(self):
        self.app.post('/api/v1/authentication/login', data='{"username": "root", "password": "root123"}', follow_redirects=True)

    def _load_data(self):
        self.user = helper.fixture(cls=models.User, persist=True, username=u'root', password='root123')
        self.account = helper.fixture(cls=models.Account, persist=True, name='citibank', user=self.user)
        amount = -10.0
        for i in range(5):
            amount = amount - 5
            helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=amount, transaction_date='2012-11-11')
        # total = -125

        helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=-25.0, transaction_date='2012-01-01')
        helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=-99.9, transaction_date='2011-05-10')

        helper.fixture(
            cls=models.ScheduledTransaction,
            persist=True,
            account=self.account,
            amount=Decimal('-50.0'),
            transaction_date='2012-11-12',
            user=self.user
        )
        helper.fixture(
            cls=models.ScheduledTransaction,
            persist=True,
            account=self.account,
            amount=Decimal('2000.0'),
            transaction_date='2012-11-12',
            user=self.user
        )
        helper.fixture(
            cls=models.ScheduledTransaction,
            persist=True,
            account=self.account,
            amount=Decimal('-500.0'),
            transaction_date='2012-11-20',
            user=self.user
        )
        helper.fixture(
            cls=models.ScheduledTransaction,
            persist=True,
            account=self.account,
            amount=Decimal('-50.0'),
            transaction_date='2012-12-12',
            user=self.user
        )
        helper.fixture(
            cls=models.ScheduledTransaction,
            persist=True,
            account=self.account,
            amount=Decimal('-200.0'),
            transaction_date='2012-12-24',
            user=self.user
        )
