 - [Backend](#backend)
 - [Frontend](#frontend)



# Backend
## API instruction
#### Please request with empty string if a field is empty.

#### All request is passed by JSON

## *signup*

#### http://127.0.0.1:5000/api/register (POST)

        {
            "email": "<email>",
            "password" : "<password>",
            "user_id": "<user_id>",
            "full_name": "<full_name>"
        }


## *login*

#### http://127.0.0.1:5000/api/login (POST)

        {
            "email": "<email>",
            "password" : "<password>"
        }

### For testing in local
- simply run main.py to start API on the terminal

        python3 run.py

[RESTful Authentication with Flask](https://blog.miguelgrinberg.com/post/restful-authentication-with-flask)


# Frontend
