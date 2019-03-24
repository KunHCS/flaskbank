from .. import all_module as am


def record_transaction(username, account_type, amount):
    time = am.datetime.now().strftime('%c')
    am.clients.update(
        {'username': username},
        {'$push': {
            'transactions': {
                '$each': [{
                    'time': time,
                    'account type': account_type,
                    'amount': amount
                }],
                '$position': 0}
        }}
    )
