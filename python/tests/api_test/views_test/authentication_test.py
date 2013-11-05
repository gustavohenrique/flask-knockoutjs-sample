from api import models
import views_test as unittest


class AuthenticationTest(unittest.TestCase):

    def test_add_user_with_valid_username_and_password(self):
        response = self.app.post('/api/v1/authentication/register', data='{"username": "gustavo", "password": "gustavo123"}')
        self.assertEqual(200, response.status_code)
        user = models.User.query.filter_by(username='gustavo').first()
        self.assertEqual('5d7158338d87f210b5533912de9967bcb81389ab', user.password)
        assert user.token

    def test_add_user_with_blank_username(self):
        response = self.app.post('/api/v1/authentication/register', data='{"username": "", "password": "gustavo123"}')
        self.assertEqual(500, response.status_code)

    def test_add_user_with_blank_password(self):
        response = self.app.post('/api/v1/authentication/register', data='{"username": "gustavo", "password": ""}')
        self.assertEqual(500, response.status_code)

    def test_add_user_with_short_password(self):
        response = self.app.post('/api/v1/authentication/register', data='{"username": "gustavo", "password": "1234"}')
        self.assertEqual(500, response.status_code)

    def test_add_user_with_long_password(self):
        response = self.app.post('/api/v1/authentication/register', data='{"username": "gustavo", "password": "0123456789_123456"}')
        self.assertEqual(500, response.status_code)

    def test_successfully_login(self):
        response = self.app.post('/api/v1/authentication/login', data='{"username": "admin", "password": "admin"}')
        self.assertEqual(200, response.status_code)

    def test_failed_login(self):
        response = self.app.post('/api/v1/authentication/login', data='{"username": "admin", "password": "admin---"}')
        self.assertEqual(401, response.status_code)

    def test_access_authorized_and_logout(self):
        self.login()

        response = self.app.get('/api/v1/authentication/logout')
        self.assertEqual(200, response.status_code)
