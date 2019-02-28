 - [Backend](#backend)
 - [Frontend](#frontend)



# Backend
## API instruction
#### Please request with empty string if a field is empty.

#### All request is passed by JSON

## *signup*

#### http://0.0.0.0:3001/signup (POST)

        {
            "email": "<email>",
            "password" : "<password>",
            "user_id": "<user_id>",
            "full_name": "<full_name>"
        }


## *login*

#### http://0.0.0.0:3001/login (GET)

        {
            "email": "<email>",
            "password" : "<password>"
        }


## *feed*

#### http://0.0.0.0:3001/feed/upload (POST)

        {
            "file_name": "<file_name>"
            "user_uuid": "<user_uuid>",
            "place" : "<place>",
            "project_name": "<project_name>",
            "difficulty" : "<difficulty>"
        }


#### http://0.0.0.0:3001/feed/n_latest (GET)
    {
        "n": "<number of videos you want to get>"
    }

    return: the list of video url


#### http://0.0.0.0:3001/feed/incre_like (POST)
    {
        "uuid": "<uuid of the feed to increment the like>"
    }


## *projects*

#### http://0.0.0.0:3001/projects/add (POST)
    {
        "name":"<name of the porject>",
        "type":"<Boulder, top lope or etc>",
        "rating": "<difficulty>",
        "location": "[
                  "California",
                  "Yosemite National Park",
                  "Yosemite Valley",
                  "Yosemite Valley Bouldering",
                  "Curry Village",
                  "Zorro Boulder"
              ]",
        "long": -119.576,
        "lag": 37.7375
    }


#### http://0.0.0.0:3001/projects/get (GET)
    {
        "name": "<name of the project>"
    }

    return: info of the project


## *delete*

#### http://0.0.0.0:3001/delete/user (POST)
    {
        "uuid": <uuid of the user to delete>
    }


#### http://0.0.0.0:3001/delete/feed (POST)
    {
        "uuid": <uuid of the feed to delete>
    }

------------

### For testing in local
- simply run main.py to start API on the terminal

        python3 main.py

- start mongoDB in terminal

        mongo ds157574.mlab.com:57574/climbing_project -u cp -p climbing_project1

- start AWS S3 on local

        $ pip3 install localstack awscli-local
        $ localstack start
        $ aws --endpoint-url=http://localhost:4572 s3 mb s3://cp_s3
        $ awslocal s3 mb s3://cp_s3
        $ awslocal s3api put-bucket-acl --bucket cp_s3 --acl public-read


- upload file to local S3

        awslocal s3 cp test2.txt s3://cp_s3/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
        awslocal s3api put-object-acl --bucket cp_s3 --key zorro.mp4 --grant-read uri=http://acs.amazonaws.com/groups/global/AllUsers


- delete file from local S3

        awslocal s3 rm s3://cp_s3/zorro.mp4

Link for local S3 [tutorial](https://medium.com/@andyalky/developing-aws-apps-locally-with-localstack-7f3d64663ce4 "tutorial")

[RESTful Authentication with Flask](https://blog.miguelgrinberg.com/post/restful-authentication-with-flask)


# Frontend
