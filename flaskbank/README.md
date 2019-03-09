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

## *Get Client Detail*
#### http://127.0.0.1:5000/api/client/info (GET)
##### Request header:

	{
		"Authorization": "Bearer  <access_token>"
	}

#### Responses:
Status: 200 OK


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
		"transactions": <transactions>,
		"username": <username>
	}


Status: 401 UNAUTHORIZED

	{
		"msg": <message>
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
			 "description":<string>,
			 "amount":<double>,
			 "from":<string>,
			 "to":<string>}
		]
	}

### For local testing
- Simply run run.py to start API on the terminal

        python run.py
        or
        python3 run.py




[RESTful Authentication with Flask](https://blog.miguelgrinberg.com/post/restful-authentication-with-flask)


# Frontend
