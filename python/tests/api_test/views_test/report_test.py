#from api import report
import unittest
from api import app, models

from tests import helper


class ReportTest(unittest.TestCase):

    def setUp(self):
        self.user = helper.fixture(cls=models.User, persist=True, username=u'root', password='root123')
        self.account = helper.fixture(cls=models.Account, persist=True, name='citibank', user=self.user)
        amount = -10.0
        for i in range(10):
            amount = amount - 5
            helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=amount, transaction_date='2012-10-01')

        # total = -375
        helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=-25.0, transaction_date='2012-01-01')
        helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=10.0, transaction_date='2012-01-02')
        helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=10.0, transaction_date='2012-01-03')
        helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=-10.0, transaction_date='2012-01-04')
        helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=-10.0, transaction_date='2012-01-05')

        helper.fixture(cls=models.Transaction, persist=True, user=self.user, account=self.account, amount=-99.9, transaction_date='2011-05-10')
        self.app = app.test_client()
        self.app.post('/api/v1/authentication/login', data='{"username": "root", "password": "root123"}', follow_redirects=True)

    def tearDown(self):
        helper.clean_initial_data()

    def test_should_return_none_when_no_date(self):
        response = self.app.get('/api/v1/reports/balance?account=%s' % self.account.id)
        self.assertEqual(500, response.status_code)

        data = helper.from_json(response.data)
        self.assertEqual(0, data['total'])
        self.assertEqual(1, len(data['messages']))

    def test_should_return_none_when_date_is_invalid(self):
        response = self.app.get('/api/v1/reports/balance?account=%sstart=2012-01-32&end=2012-03-01' % self.account.id)
        self.assertEqual(500, response.status_code)

        data = helper.from_json(response.data)
        self.assertEqual(0, data['total'])
        self.assertEqual(1, len(data['messages']))

    def test_total_amount_for_one_month_by_account(self):
        response = self.app.get('/api/v1/reports/balance?account=%s&start=2012-01-01&end=2012-01-30' % self.account.id)
        data = helper.from_json(response.data)

        self.assertEqual(1, data['total'])

        fields = data['fields']
        self.assertEqual('1/2012', fields[0].get('date'))
        self.assertEqual(-25.0, fields[0].get('balance'))

    def test_total_amount_for_all_months_by_account(self):
        response = self.app.get('/api/v1/reports/balance?account=%s&start=2011-05-01&end=2012-11-30' % self.account.id)
        data = helper.from_json(response.data)

        self.assertEqual(3, data['total'])

        fields = data['fields']
        self.assertEqual('5/2011', fields[0].get('date'))
        self.assertEqual(-99.9, fields[0].get('balance'))

        self.assertEqual('1/2012', fields[1].get('date'))
        self.assertEqual(-25.0, fields[1].get('balance'))

        self.assertEqual('10/2012', fields[2].get('date'))
        self.assertEqual(-400.0, fields[2].get('balance'))

    def test_should_return_status_200_if_total_is_zero(self):
        response = self.app.get('/api/v1/reports/balance?account=%s&start=2011-05-01&end=2011-05-01' % self.account.id)
        self.assertEqual(200, response.status_code)
