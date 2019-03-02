 - [**Backend**](#backend)
 - [**Frontend**](#frontend)



# Backend
## API instruction
#### Please request with empty string if a field is empty.

#### All request is passed by JSON

## *Registration*

#### http://127.0.0.1:5000/api/register (POST)

        {
            "first_name": <string>,
            "last_name": <string>,
            "username": "<string>",
            "email": "<string>",
            "password" : "<string>",
        }


## *Login*

#### http://127.0.0.1:5000/api/login (POST)

        {
            "email": "<string>",
            "username": "<string>"
            "password" : "<string>"
        }

## Database Structure
#### Clients collection

	{
		"first_name":<string>,
		"last_name":<string>,
		"username":<string>,
		"password":<string>,
		"email":<string>,
		
		"accounts": [
			{"alias":<string>,
			 "type":<string>,
			 "account_num": <integer>,
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
