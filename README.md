# Online Bank
This project is an online web-based bank system 
using React and Flask 

# Git setup
Install [Git](https://git-scm.com/)

Go to directory you want to work on

Open Git bash/command line there and enter:

    git init

Followed by:

	git remote add origin https://github.com/KunHCS/flaskbank.git
	
Lastly:

	git pull origin master
	
Now the working directory should be setup

# React Setup

Install [node.js](https://nodejs.org/en/) (npm), either LTS or latest version should work the same


in command line (avoid doing it in project folder if possible): 

	npx create-react-app my-app

Copy the node_modules folder from the generated my-app folder into flaskbank/react-app/

You can now delete the my-app folder if you want

You can test the react app using following in the react-app/ folder

	npm start
	
Build the react app for flask to load using:

	npm run build

# Flask Setup
Install [Python](https://www.python.org/)

Install packages: flask, flask-bcrypt, flask-pymongo

Using command line:

	pip install Flask
	pip install Flask-PyMongo
	pip install flask-bcrypt

Now you should be able to run the flask server by running run.py

	python run.py

If everything is done correctly you should be able to see the same result as npm start by going to:

	http://localhost:5000
	


