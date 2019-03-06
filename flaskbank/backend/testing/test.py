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
        self.assertEquals(response.status_code, 201)


        # ------------------------------------------------------------------------------
        # Check non-exist user
        response = app.post('http://127.0.0.1:5000/api/login',
            json={
                'username': 'some random',
                'password': 'some random'
            })
        json_data = response.get_json()
        self.assertEquals(response.status_code, 409)


        # ------------------------------------------------------------------------------
        # Bad Request, missing key
        response = app.post('http://127.0.0.1:5000/api/login',
                            json={
                                'username': 'some random'
                            })
        json_data = response.get_json()
        self.assertEquals(response.status_code, 400)


        # ------------------------------------------------------------------------------
        # Bad Request, misspelled key
        response = app.post('http://127.0.0.1:5000/api/login',
                            json={
                                'user_name': 'some random',
                                'pass_word': 'some random'
                            })
        json_data = response.get_json()
        self.assertEquals(response.status_code, 400)


if __name__ == '__main__':
    unittest.main()
