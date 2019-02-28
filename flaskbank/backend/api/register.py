import flaskbank.backend.all_module as am

register_bp = am.Blueprint('register', __name__)


@register_bp.route('/api/register', methods=['POST'])
def register():
    data = am.request.get_json()
    if data:

        first = data["first_name"]
        last = data["last_name"]
        email = data["email"]
        username = data["username"]

        if not am.clients.find_one({"username": username}):
            am.clients.insert_one({
                'first_name': first,
                'last_name': last,
                'username': username,
                'email': email,
                'password': am.bcrypt.generate_password_hash(data[
                    "password"].encode('utf-8')),

                'accounts': {'checking': [{'account_num': 123456,
                                           'balance': 0.0,
                                           'alias': 'Checking'}],
                             'savings': [{'account_num': 234567,
                                          'balance': 0.0,
                                          'alias': 'Saving'}]}
            })
            return am.make_response(('Registered', 201))

    return am.make_response(('Username already exist', 409))
