from api import models
import views_test as unittest


class CategoryTest(unittest.TestCase):

    def test_get_all_persisted_objects(self):
        response = self.app.get('/api/v1/categories')
        self.assertEqual(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(2)
        self.assertField('name').inPos(0).equal('category1')
        self.assertField('id').inPos(0).isNotNull()

        self.assertField('name').inPos(1).equal('category2')
        self.assertField('id').inPos(1).isNotNull()

    def test_return_total_zero_if_there_arent_persisted_objects(self):
        self.helper.clean_data(models.Category)

        response = self.app.get('/api/v1/categories')
        self.assertEqual(200, response.status_code)
        self.response_data = self.helper.from_json(response.data)
        self.assertTotal(0)

    def test_add_with_required_field(self):
        response = self.app.post('/api/v1/category/save', data='[{"name": "my category"}]')
        self.assertEqual(200, response.status_code)
        self.assertData({'name': 'my category'}).inModel(models.Category).isPersisted()

    def test_add_with_empty_required_field_should_return_status_500(self):
        response = self.app.post('/api/v1/category/save', data='[{"name": ""}]')
        self.assertEqual(500, response.status_code)

    def test_update_only_name_field(self):
        category = models.Category.query.first()
        self.assertEqual('category1', category.name)

        request_data = '[{"name": "my category", "id": "%s"}]' % category.id
        response = self.app.post('/api/v1/category/save', data=request_data)
        self.assertEqual(200, response.status_code)
        self.assertData({'name': 'my category'}).inModel(models.Category).hasId(category.id)

    def test_delete_category_and_set_its_transactions_to_none(self):
        category = models.Category.query.first()
        transactions = models.Transaction.query.filter_by(category_id=category.id)
        self.assertEqual(3, transactions.count())

        response = self.app.get('/api/v1/category/delete/%s' % category.id)
        self.assertEqual(200, response.status_code)

        self.assertData({'name': 'my category'}).inModel(models.Category).isNotPersisted()
        self.assertEqual(0, transactions.count())

    def test_delete_with_invalid_id_should_status_404(self):
        response = self.app.get('/api/v1/category/delete/1234')
        self.assertEqual(404, response.status_code)
