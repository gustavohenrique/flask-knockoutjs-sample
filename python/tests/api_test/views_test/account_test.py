from api import models
import views_test as unittest


class AccountTest(unittest.TestCase):

    def test_get_all_persisted_objects(self):
        response = self.app.get('/api/v1/accounts')
        self.assertEqual(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(2)
        self.assertField('name').inPos(0).equal('account1')
        self.assertField('id').inPos(0).isNotNull()

        self.assertField('name').inPos(1).equal('account2')
        self.assertField('id').inPos(1).isNotNull()

    def test_get_all_from_other_user(self):
        self.login_tux()
        response = self.app.get('/api/v1/accounts')
        self.assertEqual(200, response.status_code)

        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(1)
        self.assertField('name').inPos(0).equal('account3')

    def test_return_total_zero_if_there_arent_persisted_objects(self):
        self.helper.clean_data(models.Account)

        response = self.app.get('/api/v1/accounts')
        self.assertEqual(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(0)

    def test_add_with_required_field(self):
        response = self.app.post('/api/v1/account/save', data='[{"name": "my account"}]')
        self.assertEqual(200, response.status_code)
        self.assertData({'name': 'my account'}).inModel(models.Account).isPersisted()

    def test_add_with_empty_required_field_should_return_status_500(self):
        response = self.app.post('/api/v1/account/save', data='[{"name": ""}]')
        self.assertEqual(500, response.status_code)

    def test_update_only_name_field(self):
        account = models.Account.query.first()
        self.assertEqual('account1', account.name)

        request_data = '[{"name": "my account", "id": "%s"}]' % account.id
        response = self.app.post('/api/v1/account/save', data=request_data)
        self.assertEqual(200, response.status_code)
        self.assertData({'name': 'my account'}).inModel(models.Account).hasId(account.id)

    def test_delete_account_and_set_its_transactions_to_none(self):
        account = models.Account.query.filter_by(name=u'account1').first()
        transactions = models.Transaction.query.filter_by(account_id=account.id)
        self.assertEqual(2, transactions.count())

        response = self.app.get('/api/v1/account/delete/%s' % account.id)
        self.assertEqual(200, response.status_code)

        self.assertData({'name': 'my account1'}).inModel(models.Account).isNotPersisted()
        self.assertEqual(0, transactions.count())

    def test_delete_with_invalid_id_should_status_404(self):
        response = self.app.get('/api/v1/account/delete/1234')
        self.assertEqual(404, response.status_code)
