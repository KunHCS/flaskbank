 - [Backend](#backend)
 - [Frontend](#frontend)



# Backend
## API instruction
#### Please request with empty string if a field is empty.

#### All request is passed by JSON

## *signup*

#### http://127.0.0.1:5000/api/register (POST)

        {
            "first_name": <string>,
            "last_name": <string>,
            "email": "<string>",
            "password" : "<string>",
            "username": "<string>",
            
        }


## *login*

#### http://127.0.0.1:5000/api/login (POST)

        {
            "email": "<string>",
            "username": "<string>"
            "password" : "<string>"
        }

## Database Structure
#### Clients

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

### For testing in local
- simply run main.py to start API on the terminal

        python3 run.py

[RESTful Authentication with Flask](https://blog.miguelgrinberg.com/post/restful-authentication-with-flask)


# Frontend
