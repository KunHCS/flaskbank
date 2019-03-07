import unittest
from flaskbank.backend import create_app


class APITestCase(unittest.TestCase):
    def test_login(self):
        app = create_app().test_client()

        # ------------------------------------------------------------------------------
        # Check if the username and password matches
        response = app.post('http://127.0.0.1:5000/api/login',
                            json={
                                'username': 'a',
                                'password': 'a'
                            })
        json_data = response.get_json()
        self.assertEqual(response.status_code, 201)

        # ------------------------------------------------------------------------------
        # Check non-exist user
        response = app.post('http://127.0.0.1:5000/api/login',
                            json={
                                'username': 'some random',
                                'password': 'some random'
                            })
        json_data = response.get_json()
        self.assertEqual(response.status_code, 409)

        # ------------------------------------------------------------------------------
        # Bad Request, missing key
        response = app.post('http://127.0.0.1:5000/api/login',
                            json={
                                'username': 'some random'
                            })
        json_data = response.get_json()
        self.assertEqual(response.status_code, 400)

        # ------------------------------------------------------------------------------
        # Bad Request, misspelled key
        response = app.post('http://127.0.0.1:5000/api/login',
                            json={
                                'user_name': 'some random',
                                'pass_word': 'some random'
                            })
        json_data = response.get_json()
        self.assertEqual(response.status_code, 400)

    def test_signup_and_delete(self):
        app = create_app().test_client()
        # ------------------------------------------------------------------------------
        # Check normal registration
        response = app.post('http://127.0.0.1:5000/api/register',
                            json={
                                'first_name': 'some random',
                                'last_name': 'some random',
                                'email': 'some random',
                                'username': 'some random',
                                'password': 'some random'
                            })
        json_data = response.get_json()
        self.assertEqual(response.status_code, 201)

        # ------------------------------------------------------------------------------
        # Check normal deletion
        response = app.delete(
            'http://127.0.0.1:5000/api/utils/!CLEAR_ONE_CLIENTS/some random')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
