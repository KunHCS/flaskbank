 - [**Backend**](#backend)
 - [**Frontend**](#frontend)



# Backend
## API instruction
#### Please request with empty string if a field is empty.

#### All request is passed by JSON unless otherwise specified

## *Registration*

#### http://127.0.0.1:5000/api/register (POST)
##### Request Body:
Note: the deposits are optional

	{
		"first_name": <string>,
		"last_name": <string>,
		"username": "<string>",
		"email": "<string>",
		"password" : "<string>",
		"deposit_saving": <amount>,
		"deposit_checking": <amount>,
		"user_type": <manage/client>
	}
#### Responses:
Status: 201 CREATED

	{
		"msg": <message>
	}

Status: 409 CONFLICT

	{
		"msg": <message>
	}

Status: 400 BAD REQUEST

	{
		"msg": <message>
	}

## *Update Client Information*

#### http://127.0.0.1:5000/api/client/update (POST)
**Note: if username is changed, access_token will be revoked, requiring new login**

##### Request header:

	{
		"Authorization": "Bearer  <access_token>"
	}

##### Request Body (empty string if no update for that field):

	{
		"first_name": <string>,
		"last_name": <string>,
		"username": "<string>",
		"email": "<string>",
		"password" : "<string>",
	}
#### Responses:

Status: 200 OK

Status: 400 BAD REQUEST

## *Login*
#### http://127.0.0.1:5000/api/login (POST)
##### Request Body:
	{
		"username": "<string>"
		"password" : "<string>"
	}
#### Responses:
Status: 201 CREATED

	{
		"access_token": <token>
	}

Status: 409 CONFLICT

	{
		"msg": <message>
	}

Status: 400 BAD REQUEST

	{
		"msg": <message>
	}

## *Logout*
#### http://127.0.0.1:5000/api/logout (DELETE)
##### Request header:

	{
		"Authorization": "Bearer  <access_token>"
	}

#### Responses:
Status: 200 OK

	{
		"msg": <message>
	}

Status: 401 UNAUTHORIZED

	{
		"msg": <message>
	}

Status: 422 UNPROCESSABLE ENTITY

	{
		"msg": <message>
	}


## *Get Client Detail*
#### http://127.0.0.1:5000/api/client/{endpoint} (GET)
	endpoint = ['all', 'accounts', 'contact',
						  'id']
##### Request header:

	{
		"Authorization": "Bearer  <access_token>"
	}

#### Responses:
Status: 200 OK

###### Response body will be subset of /all based on endpoint ######

/all

	{
		"accounts": [
			{
				"account_number": <account number>,
				"active": <boolean>,
				"alias": <account alias>,
				"balance": <double>,
				"credit_limit": <double> (credit account only),
				"type": <account type>,
				"transactions": [
							{
								"date":<date>,
								"description":<string>,
								"amount":<double>,
							}
						]
			},
		],
		"email": <email>,
		"first_name": <first name>,
		"last_name": <last name>,
		"username": <username>
	}

Status: 400 BAD REQUEST

	{
		"allowed_endpoint": <endpoints>
		"msg": <message>
	}

Status: 401 UNAUTHORIZED

	{
		"msg": <message>
	}

Status: 422 UNPROCESSABLE ENTITY

	{
		"msg": <message>
	}

## *Get client transactions (specific account)*
#### http://127.0.0.1:5000/api/client/transaction/{account_number}/{year}/{month} (GET)
Note: year and month are optional

##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

### Responses:
Status: 200 OK

	{
		"transactions": <transaction array>
	}

## *Get client transactions (all account)*
#### http://127.0.0.1:5000/api/client/transaction/all/{year}/{month} (GET)
Note: year and month are **NOT** optional (for now)

##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

### Responses:
Status: 200 OK

	{
		"accounts": [{
            "account_number": <account number>,
            "transactions": <transaction array>
        }]
	}

## *Open New Account*
#### http://127.0.0.1:5000/api/accounts/open (POST)
##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

##### Request body:
	{
		"alias": <string>,
		"type": <"saving"/"checking">,
		"deposit": <double>
	}

### Responses:
Status: 201 CREATED

	{
		"account_number": <int>,
		"msg": "Account created"
	}

Status: 400 BAD REQUEST

## *Close Specific Account*
#### http://127.0.0.1:5000/api/accounts/close/{account_number} (DELETE)
##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

### Responses:
Status: 200 OK

	{
		"msg": "Account <account_number> closed"
	}

Status: 409 CONFLICT

	{
		"msg": "User <username> does not own account: <account_number>"
	}

## *Close All Accounts (remove client completely)*
#### http://127.0.0.1:5000/api/accounts/delete (DELETE)
##### Request Body:
	{
		"username": "<string>"
		"password" : "<string>"
	}
### Responses:
Status: 200 OK
Status: 409 CONFLICT



## *Deposit*
#### http://127.0.0.1:5000/api/deposit/ (POST)
##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

##### Request body:
	{
		"amount": <amount>
		"account_num": <account number>
	}

### Responses:
Status: 200 OK

Status: 400 BAD REQUEST

## *Check Image Deposit*
#### http://127.0.0.1:5000/api/deposit/check (POST)
##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}
**=>[React image upload example](https://www.academind.com/learn/react/snippets/image-upload/ "React image upload example")<=**
##### Request body (use form-data):
	{
		"image": <image file>,
		"account": <account number>
	}
### Responses:
Status: 200 OK

Status: 400 BAD REQUEST

## *Withdraw*
#### http://127.0.0.1:5000/api/withdraw (POST)
##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

##### Request body:
	{
		"amount": <amount>,
		"account_number": <account number>
	}

### Responses:
Status: 200 OK

Status: 400 BAD REQUEST

## *Transfer*
#### http://127.0.0.1:5000/api/transfer (POST)
##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

##### Request body:
	{
		"account_from": <account number>,
		"account_to": <account number>,
		"amount": <float>
	}

### Responses:
Status: 200 OK

Status: 400 BAD REQUEST

## *Set Up Autopay*
#### http://127.0.0.1:5000/api/autopay (POST)
##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

##### Request body:
	{
		"from": <account>,
		"to": <account>,
		"amount": <amount>,
		"interval": <minute>
	}

### Responses:
Status: 200 OK

Status: 400 BAD REQUEST


## *Stop Autopay*
stops all autopay for the user
#### http://127.0.0.1:5000/api/autopay/stop (POST)
##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

### Responses:
Status: 200 OK

Status: 400 BAD REQUEST


## *Get Autopay*
return all the currently active autopay
#### http://127.0.0.1:5000/api/autopay/get (POST)
##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

### Responses:
Status: 200 OK

Status: 400 BAD REQUEST

## *Reset Password*
return all the currently active autopay
#### http://127.0.0.1:5000/api/reset (POST)
	{
		"username": "<string>",
		"email": "<string>",
		"password" : "<string>",
	}

### Responses:
Status: 200 OK

Status: 400 BAD REQUEST

Status: 503 SERVICE UNAVAILABLE


## *Manager Query Client*
return all the currently active autopay
#### http://127.0.0.1:5000/api/manager/query/{Attribute}/{Query} (GET)
	Attritubes: {'email', 'username', 'first', 'last', 'account'}

##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

### Responses:
Status: 200 OK

Status: 400 BAD REQUEST


## *Manager Get all Client*
return all the currently active autopay
#### http://127.0.0.1:5000/api/manager/get (GET)

##### Request header:
	{
		"Authorization": "Bearer  <access_token>"
	}

### Responses:
Status: 200 OK

Status: 400 BAD REQUEST


## Database Structure
#### Clients collection

	{
		"first_name":<string>,
		"last_name":<string>,
		"username":<string>,
		"email":<string>,
		"password":<string>,

		"accounts": [
			{"account_num":<integer>,
			 "alias":<string>,
			 "balance":<double>
			 "credit_limit": <double> (credit account only),
			 "type":<string>,
			 "active": <boolean>,
			 		"transactions": [
							{
							"date":<date>,
							"description":<string>,
							"amount":<double>,
							}
					]
			}
		]
	}

### For local testing
- Simply run run.py to start API on the terminal

        python run.py
        or
        python3 run.py




[RESTful Authentication with Flask](https://blog.miguelgrinberg.com/post/restful-authentication-with-flask)


# Frontend

## Install react-redux library
npm install redux react-redux

## Install Google Map React 
 npm npm install google-map-react

## Install React on Created File
 npm install react react-dom
