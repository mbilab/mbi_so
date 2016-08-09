# mbi_so

## Build

Install required packages

    pip install -r pip-modules.txt
    npm i     # semantic-ui select express version

Init database

    ./manage.py migrate

Start webpack

    npm start

Start Django app

    ./manage.py runserver

Add fake data

    ./manage.py loaddata mock-data.json
