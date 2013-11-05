from api import models
import views_test as unittest
from datetime import date


class TransactionTest(unittest.TestCase):

    def test_get_all_persisted_objects(self):
        response = self.app.get('/api/v1/transactions')
        self.assertEqual(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(5)
        self.assertField('description').inPos(0).equal('a1 c1 p1')
        self.assertField('amount').inPos(0).equal(-1.99)
        self.assertField('id').inPos(0).isNotNull()

    def test_return_total_zero_if_there_arent_persisted_objects(self):
        self.helper.clean_data(models.Transaction)

        response = self.app.get('/api/v1/transactions')
        self.assertEqual(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(0)

    def test_get_all_from_other_user(self):
        self.login_tux()
        response = self.app.get('/api/v1/transactions')
        self.assertEqual(200, response.status_code)

        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(1)
        self.assertField('description').inPos(0).equal('a3 c3 p3')

    def test_should_return_empty_account_category_payee_if_is_null(self):
        self.helper.clean_data(models.Transaction)
        self.helper.fixture(
            cls=models.Transaction,
            user_id=models.User.query.filter_by(username=u'admin').first().id,
            description=u'new book',
            amount=-30,
            transaction_date=str(date.today()),
            ignored_fields=['account_id', 'payee_id', 'category_id'],
            persist=True
        )

        response = self.app.get('/api/v1/transactions')
        self.assertEqual(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(1)
        self.assertField('account').inPos(0).equal({'id': 0, 'name': ''})
        self.assertField('category').inPos(0).equal({'id': 0, 'name': ''})
        self.assertField('payee').inPos(0).equal({'id': 0, 'name': ''})

    def test_ordering_asc_date_field(self):
        response = self.app.get('/api/v1/transactions?ordering=asc')
        self.assertEqual(200, response.status_code)

        self.response_data = self.helper.from_json(response.data)
        self.assertField('transaction_date').inPos(0).equal('2012-01-08')

    def test_ordering_desc_date_field(self):
        response = self.app.get('/api/v1/transactions?ordering=desc')
        self.assertEqual(200, response.status_code)

        self.response_data = self.helper.from_json(response.data)
        self.assertField('transaction_date').inPos(0).equal('2012-01-12')

    def test_add_with_required_field(self):
        request_data = '[{"description": "another transaction", "transaction_date": "2012-03-04", "amount": "-10.98"}]'
        response = self.app.post('/api/v1/transaction/save', data=request_data)
        self.assertEqual(200, response.status_code)

        transaction = models.Transaction.query.filter_by(description=u'another transaction').first()
        assert transaction.id
        assert transaction.transaction_date
        assert transaction.amount

    def test_add_with_all_fields(self):
        account = models.Account.query.first()
        category = models.Category.query.first()
        payee = models.Payee.query.first()

        request_data = '''
            [{"description": "another transaction",
              "transaction_date": "2012-03-04",
              "amount": "-10.98",
              "account": {"id": "%s", "name": "%s"},
              "category": {"id": "%s", "name": "%s"},
              "payee": {"id": "%s", "name": "%s"}
        }]''' % (account.id, account.name, category.id, category.name, payee.id, payee.name)

        response = self.app.post('/api/v1/transaction/save', data=request_data)
        self.assertEqual(200, response.status_code)

        transaction = models.Transaction.query.filter_by(description=u'another transaction').first()
        assert transaction.description
        assert transaction.transaction_date
        assert transaction.amount
        assert transaction.account
        assert transaction.category
        assert transaction.payee

    def test_update_few_fields(self):
        transaction = models.Transaction.query.filter_by(description=u'a1 c1 p1').first()
        account = models.Account.query.first()
        category = models.Category.query.first()
        payee = models.Payee.query.first()

        request_data = '''
            [{"description": "another transaction",
              "transaction_date": "2012-10-12",
              "amount": "-99.99",
              "id": "%s",
              "account": {"id": "%s", "name": "%s"},
              "category": {"id": "%s", "name": "%s"},
              "payee": {"id": "%s", "name": "%s"}
        }]''' % (transaction.id, account.id, account.name, category.id, category.name, payee.id, payee.name)

        response = self.app.post('/api/v1/transaction/save', data=request_data)
        self.assertEqual(200, response.status_code)

        transaction = models.Transaction.query.filter_by(description=u'another transaction').first()
        assert transaction.description
        assert transaction.transaction_date
        assert transaction.amount
        assert transaction.account
        assert transaction.category
        assert transaction.payee

    def test_delete_byid(self):
        transaction = models.Transaction.query.filter_by(description=u'a1 c1 p1').first()
        response = self.app.get('/api/v1/transaction/delete/%s' % transaction.id)
        self.assertEqual(200, response.status_code)

        self.assertData({'description': 'a1 c1 p1'}).inModel(models.Transaction).isNotPersisted()

    def test_delete_with_invalidid_should_status_404(self):
        response = self.app.get('/api/v1/transaction/delete/1234')
        self.assertEqual(404, response.status_code)
