# Online Bank
This project is an online web-based bank system 
using React and Flask 

# Git setup
Install [Git](https://git-scm.com/)

Go to directory you want to work on

Open Git bash/command-line there and enter:

    git init

Followed by:

	git remote add origin https://github.com/KunHCS/flaskbank.git
	
Lastly:

	git pull origin master
	
Now the working directory should be setup

# React Setup

Install [Node.js](https://nodejs.org/en/) (npm), either LTS or latest version should work the same

**All follwing command should be run in flaskbank/react-app/ folder**

To install React dependencies, open command-line and run:

	npm install

To test the react app, run:

	npm start
	
To build the react app for flask to load, run:

	npm run build

# Flask Setup
Install [Python](https://www.python.org/)

Install [pip](https://pip.pypa.io/en/stable/installing/) (if it didn't come with python for some reason)

**Open command-line in project root folder for the following**

Install dependencies:

	pip install -r requirements.txt

To start flask:

	python run.py

If everything is done correctly you should be able to see the same result as npm start by going to:

	http://localhost:5000
	


