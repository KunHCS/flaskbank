# Online Bank
This project is an online web-based bank system 
using React and Flask 

# Git setup
Install [Git](https://git-scm.com/)

Go to directory you want to work on

Open Git bash/command-line there and enter:

	git clone https://github.com/KunHCS/flaskbank.git

# React Setup

Install [Node.js](https://nodejs.org/en/) (npm), either LTS or latest version should work the same

**Open command-line in flaskbank/react-app/ for the following**

To install React dependencies

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
	or
	pip3 install -r requirements.txt

To start flask:

	python run.py
	or
	python3 run.py

To grant access to local network (if network permits)

	python run.py -l
	or
	python3 run.py -l

To see different options:

	python run.py -h
	or
	python3 run.py -h

If everything is done correctly you should be able access the website using:

	On your own machine
	http://localhost:5000
	or
	Local hosting (others on same network can access, if allowed)
	http://<your local IP>:5000



