 - [**Backend**](#backend)
 - [**Frontend**](#frontend)



# Backend
## API instruction
#### Please request with empty string if a field is empty.

#### All request is passed by JSON

## *Registration*

#### http://127.0.0.1:5000/api/register (POST)
##### Request Body:

	{
		"first_name": <string>,
		"last_name": <string>,
		"username": "<string>",
		"email": "<string>",
		"password" : "<string>",
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
	endpoint = ['all', 'transactions', 'accounts', 'contact',
						  'id']
##### Request header:

	{
		"Authorization": "Bearer  <access_token>"
	}

#### Responses:
Status: 200 OK
######Response body will be subset of /all based on endpoint

#####/all

	{
		"accounts": [
			{
				"account_number": <account number>,
				"active": <boolean>,
				"alias": <account alias>,
				"balance": <double>,
				"type": <account type>
			},
		],
		"email": <email>,
		"first_name": <first name>,
		"last_name": <last name>,
		
		"transactions": [
			{"date":<date>,
			 "account_type": <checking/saving>,
			 "account_number": <account_number>,
			 "description":<string>,
			 "amount":<double>,
			}
		],
		
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

## *Close Account*
#### http://127.0.0.1:5000/api/accounts/close/{account_number}(POST)
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
			 "type":<string>,
			 "active": <boolean>}
		]
		
		"transactions": [
			{"date":<date>,
			 "account_type": <saving/checking>,
			 "account_number": <account_number>,
			 "description":<string>,
			 "amount":<double>,
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