"""
Starts the flask server
"""
from flaskbank.backend import create_app
import sys

app = create_app()
if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '-h':
        app.run(host='0.0.0.0', debug=True)
    elif len(sys.argv) > 1 and sys.argv[1] == '-p':
        app.run(host='0.0.0.0')
    else:
        app.run(debug=True)
