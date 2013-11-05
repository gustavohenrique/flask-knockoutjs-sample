from api import models
import views_test as unittest


class PayeeTest(unittest.TestCase):

    def test_get_all_persisted_objects(self):
        response = self.app.get('/api/v1/payees')
        self.assertEqual(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(2)
        self.assertField('name').inPos(0).equal('payee1')
        self.assertField('id').inPos(0).isNotNull()

        self.assertField('name').inPos(1).equal('payee2')
        self.assertField('id').inPos(1).isNotNull()

    def test_get_all_from_other_user(self):
        self.login_tux()
        response = self.app.get('/api/v1/payees')
        self.assertEqual(200, response.status_code)

        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(1)
        self.assertField('name').inPos(0).equal('payee3')

    def test_return_total_zero_if_there_arent_persisted_objects(self):
        self.helper.clean_data(models.Payee)

        response = self.app.get('/api/v1/payees')
        self.assertEqual(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(0)

    def test_add_with_required_field(self):
        response = self.app.post('/api/v1/payee/save', data='[{"name": "my payee"}]')
        self.assertEqual(200, response.status_code)
        self.assertData({'name': 'my payee'}).inModel(models.Payee).isPersisted()

    def test_add_with_empty_required_field_should_return_status_500(self):
        response = self.app.post('/api/v1/payee/save', data='[{"name": ""}]')
        self.assertEqual(500, response.status_code)

    def test_update_only_name_field(self):
        payee = models.Payee.query.first()
        self.assertEqual('payee1', payee.name)

        request_data = '[{"name": "my payee", "id": "%s"}]' % payee.id
        response = self.app.post('/api/v1/payee/save', data=request_data)
        self.assertEqual(200, response.status_code)
        self.assertData({'name': 'my payee'}).inModel(models.Payee).hasId(payee.id)

    def test_delete_payee_and_set_its_transactions_to_none(self):
        payee = models.Payee.query.first()
        transactions = models.Transaction.query.filter_by(payee_id=payee.id)
        self.assertEqual(2, transactions.count())

        response = self.app.get('/api/v1/payee/delete/%s' % payee.id)
        self.assertEqual(200, response.status_code)

        self.assertData({'name': 'my payee'}).inModel(models.Payee).isNotPersisted()
        self.assertEqual(0, transactions.count())

    def test_delete_with_invalidid_should_status_404(self):
        response = self.app.get('/api/v1/payee/delete/1234')
        self.assertEqual(404, response.status_code)
