from datetime import date
from dateutil.relativedelta import relativedelta

from api import models
import views_test as unittest


class ScheduledTransactionTest(unittest.TestCase):

    def test_add_repeated_every_2_weeks_3_times(self):
        account = models.Account.query.first()
        dt = date.today() + relativedelta(weeks=+3)
        future = self.helper.format_date(dt, self.DATE_FORMAT)

        request_data = '''{
            "description": "another transaction",
            "amount": "-70.0",
            "account": {"id": "%s", "name": "%s"},
            "frequency": "3",
            "unit_replications": "weeks",
            "number_replications": "2",
            "transaction_date": "%s"
        }''' % (account.id, account.name, future)

        response = self.app.post('/api/v1/scheduled/transaction/save', data=request_data)
        self.assertEquals(200, response.status_code)

        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(3)

        transactions = models.ScheduledTransaction.query.filter_by(description=u'another transaction').all()
        self.assertEqual(3, len(transactions))

    def test_add_repeated_every_month_12_times(self):
        account = models.Account.query.first()
        dt = date.today() + relativedelta(months=+1)
        future = self.helper.format_date(dt, self.DATE_FORMAT)

        request_data = '''{
            "description": "another transaction",
            "amount": "-70.0",
            "account": {"id": "%s", "name": "%s"},
            "frequency": "12",
            "unit_replications": "months",
            "number_replications": "1",
            "transaction_date": "%s"
        }''' % (account.id, account.name, future)

        response = self.app.post('/api/v1/scheduled/transaction/save', data=request_data)
        self.assertEquals(200, response.status_code)

        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(12)

        transactions = find_by_description('another transaction')
        self.assertEqual(12, len(transactions))

    def test_add_repeated_every_2_years_5_times(self):
        account = models.Account.query.first()
        dt = date.today() + relativedelta(months=+1)
        future = self.helper.format_date(dt, self.DATE_FORMAT)

        request_data = '''{
            "description": "another transaction",
            "amount": "-70.0",
            "account": {"id": "%s", "name": "%s"},
            "frequency": "5",
            "unit_replications": "years",
            "number_replications": "2",
            "transaction_date": "%s"
        }''' % (account.id, account.name, future)

        response = self.app.post('/api/v1/scheduled/transaction/save', data=request_data)
        self.assertEquals(200, response.status_code)

        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(5)

        transactions = find_by_description('another transaction')
        self.assertEqual(5, len(transactions))

    def test_get_all_persisted_objects(self):
        response = self.app.get('/api/v1/scheduled/transactions')
        self.assertEquals(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(3)

    def test_get_upcoming_on_30_days(self):
        response = self.app.get('/api/v1/scheduled/transactions/upcoming')
        self.assertEquals(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(2)

    def test_delete_by_key_field(self):
        transaction = find_by_description('Domain registration')[0]

        response = self.app.get('/api/v1/scheduled/transaction/delete/%s' % transaction.key)
        self.assertEqual(200, response.status_code)

        scheduled = models.ScheduledTransaction.query.filter_by(key=unicode(transaction.key)).all()
        self.assertEqual(0, len(scheduled))

    def test_should_return_status_404_if_delete_by_invalid_key_field(self):
        response = self.app.get('/api/v1/scheduled/transaction/delete/*+"')
        self.assertEqual(404, response.status_code)

    def test_pay_a_transaction_based_on_scheduled_transaction(self):
        transaction = models.ScheduledTransaction.query.filter_by(key=u'abcd').order_by('transaction_date').first()
        request_data = '''{
            "id": "%s",
            "key": "%s",
            "description": "Internet service provider",
            "amount": "-70.0"
        }''' % (transaction.id, transaction.key)

        response = self.app.post('/api/v1/scheduled/transaction/finish', data=request_data)
        self.assertEquals(200, response.status_code)

        scheduleds = find_by_description('Internet service provider')
        self.assertEqual(2, len(scheduleds))

        transaction = models.Transaction.query.filter_by(description='Internet service provider').first()
        today = self.helper.format_date(date.today(), self.DATE_FORMAT)
        transaction_date = self.helper.format_date(transaction.transaction_date, self.DATE_FORMAT)
        self.assertEqual(today, transaction_date)
        self.assertEqual(-70.0, transaction.amount)


def find_by_description(value):
    return models.ScheduledTransaction.query.filter_by(description=unicode(value)).all()
