"""
Starts the flask server
"""
from flaskbank.backend import create_app
import argparse


def main():
    parser = argparse.ArgumentParser(description='Flask Bank Project',
                                     epilog='Default: run on local machine, '
                                            'debug on')
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-l', '--local', action='store_true',
                       help='Host server locally, debug on')
    group.add_argument('-p', '--production', action='store_true',
                       help='Production mode, debug off')
    args = parser.parse_args()

    debug_host = args.local
    production = args.production

    app = create_app()

    if debug_host:
        app.run(host='0.0.0.0', debug=True)
    elif production:
        app.run(host='0.0.0.0')
    else:
        app.run(debug=True)


if __name__ == '__main__':
    main()
