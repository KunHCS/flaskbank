"""
Unit Tests for API routes
"""
import unittest
from flaskbank.backend import create_app


class TestUtils:
    """
    Utilities for use during testing
    """

    username = 'firstlast'
    password = 'firstlastpass'
    reg_route = 'http://127.0.0.1:5000/api/register'
    del_route = f'http://127.0.0.1:5000/api/utils' \
        f'/!CLEAR_ONE_CLIENTS/{username}'

    login_route = 'http://127.0.0.1:5000/api/login'

    dummy = {
        'first_name': 'first',
        'last_name': 'last',
        'email': 'firstlast@mail.com',
        'username': username,
        'password': password
    }
    login_header = None

    @classmethod
    def delete_dummy(cls):
        create_app().test_client().delete(cls.del_route)

    @classmethod
    def insert_dummy(cls):
        create_app().test_client().post(cls.reg_route, json=cls.dummy)

    @classmethod
    def login_dummy(cls):
        response = create_app().test_client().post(cls.login_route,
                                                  json={
                                                      'username': cls.username,
                                                      'password': cls.password
                                                  })
        token = response.get_json()['access_token']
        cls.login_header = {'Authorization': 'Bearer ' + token}


class TestRegistrationAndDeletion(unittest.TestCase):
    """
    Tests User Registration and Deletion
    """

    def setUp(self):
        self.test_client = create_app().test_client()
        self.username = 'firstlast'
        self.reg_route = 'http://127.0.0.1:5000/api/register'
        self.del_route = f'http://127.0.0.1:5000/api/utils' \
            f'/!CLEAR_ONE_CLIENTS/{self.username}'

        self.http_body = {
            'first_name': 'first',
            'last_name': 'last',
            'email': 'firstlast@mail.com',
            'username': self.username,
            'password': 'firstlastpass'
        }
        self.test_client.delete(self.del_route)

    def tearDown(self):
        self.test_client.delete(self.del_route)

    def test_register_new_user(self):
        response = self.test_client.post(self.reg_route, json=self.http_body)
        self.assertEqual(response.status_code, 201)

    def test_register_user_exist(self):
        self.test_client.post(self.reg_route, json=self.http_body)
        response = self.test_client.post(self.reg_route, json=self.http_body)
        self.assertEqual(response.status_code, 409)

    def test_delete_user_exist(self):
        self.test_client.post(self.reg_route, json=self.http_body)
        response = self.test_client.delete(self.del_route)
        self.assertEqual(response.status_code, 200)

    def test_delete_user_not_exist(self):
        response = self.test_client.delete(self.del_route)
        self.assertEqual(response.status_code, 409)


class TestAuthentication(unittest.TestCase):
    """
    Test Authentication functions
    """

    def setUp(self):
        TestUtils.insert_dummy()
        self.test_client = create_app().test_client()
        self.password = TestUtils.password
        self.http_body = {
            'username': TestUtils.username,
            'password': self.password
        }
        self.login_route = 'http://127.0.0.1:5000/api/login'
        self.login = lambda: self.test_client.post(self.login_route,
                                                   json=self.http_body)

    def tearDown(self):
        TestUtils.delete_dummy()

    def test_login_correct_password(self):
        response = self.login()
        self.assertEqual(response.status_code, 201)

    def test_login_wrong_password(self):
        self.http_body['password'] = 'wrong'
        response = self.login()
        self.assertEqual(response.status_code, 409)

    def test_login_no_user(self):
        TestUtils.delete_dummy()
        response = self.login()
        self.assertEqual(response.status_code, 409)

    def test_logout(self):
        """Tests token revoking, accessing revoked token should 401"""
        token = self.login().get_json().get('access_token', None)
        response = self.test_client.delete('http://127.0.0.1:5000/api/logout',
                                           headers={
                                               'Authorization': 'Bearer ' + token}
                                           )
        self.assertEqual(response.status_code, 200)

        response2 = self.test_client.delete('http://127.0.0.1:5000/api/logout',
                                            headers={
                                                'Authorization': 'Bearer ' + token}
                                            )

        self.assertEqual(response2.status_code, 401)


class TestGetClientInfo(unittest.TestCase):
    """
    Test get client information route correctness
    """

    def setUp(self):
        self.test_client = create_app().test_client()
        TestUtils.insert_dummy()
        self.auth_token = self.test_client.post(
            'http://127.0.0.1:5000/api/login', json={
                'username': TestUtils.username,
                'password': TestUtils.password
            }).get_json().get('access_token', 'bad')
        self.info_route = 'http://127.0.0.1:5000/api/client/info'
        self.get_client = lambda: self.test_client.get(self.info_route,
                                                       headers={
                                                           'Authorization': 'Bearer ' + self.auth_token})

    def tearDown(self):
        TestUtils.delete_dummy()

    def test_get_client_valid_token(self):
        """Test if correct user is returned"""
        response = self.get_client()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json().get('username', 'bad'),
                         TestUtils.username)

    def test_get_client_invalid_token(self):
        self.auth_token = 'bad.bad.bad'
        response = self.get_client()
        self.assertEqual(response.status_code, 422)


class TestAccountsOperations(unittest.TestCase):

    def setUp(self):
        self.test_client = create_app().test_client()
        TestUtils.insert_dummy()
        TestUtils.login_dummy()
        self.test_body = {
            'alias': 'dummy test account',
            'type': 'saving',
            'deposit': 0.0
        }

    def tearDown(self):
        TestUtils.delete_dummy()

    def test_open_account_0(self):
        """Test open new account with 0 deposit"""
        response = self.test_client.post(
            'http://127.0.0.1:5000/api/accounts/open', json=self.test_body,
            headers=TestUtils.login_header)
        self.temp_account = response.get_json().get('account_number', 0)
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(self.temp_account, 0)


if __name__ == '__main__':
    unittest.main()
