# Vent Your Rent

Renters vent about their conditions and sign up to the Renters Manifesto

[![Built with Cookiecutter
Django](https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg)](https://github.com/pydanny/cookiecutter-django/)

[![Black code
style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)

Vent Your Rent has two components, a backend and a frontend. The backend [Django](https://www.djangoproject.com/) application providing an adminstration interface and [a GraphQL endpoint](https://graphql.org/). The frontend is a React application which can be found in the `frontend/` directory of this repository.

## Local Development

For detailed information see [https://cookiecutter-django.readthedocs.io/en/latest/developing-locally-docker.html](https://cookiecutter-django.readthedocs.io/en/latest/developing-locally-docker.html)

### Requirements

- [Docker](https://docs.docker.com/install/)

### Starting Up

To start the backend using [Docker Compose](https://docs.docker.com/compose/):

    $ docker-compose -f local.yml up

## Management Commands

Django management commands can be run using [`docker-compose run`](https://docs.docker.com/compose/reference/run/):

    $ docker-compose -f local.yml run --rm django python manage.py
    $ docker-compose -f local.yml run --rm django python manage.py migrate

### Setting Up Your Users

- To create a **normal user account**, just go to Sign Up and fill out
  the form. Once you submit it, you'll see a "Verify Your E-mail
  Address" page. Go to your console to see a simulated email
  verification message. Copy the link into your browser. Now the
  user's email should be verified and ready to go.

- To create an **superuser account**, use this command:

      $ docker-compose -f local.yml run --rm django python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and
your superuser logged in on Firefox (or similar), so that you can see
how the site behaves for both kinds of users.

### Type checks

Running type checks with mypy:

    $ docker-compose -f local.yml run --rm  django mypy vent_your_rent

### Test coverage

To run the tests, check your test caoverage, and generate an HTML
coverage report:

    $ docker-compose -f local.yml run --rm django coverage run -m pytest
    $ docker-compose -f local.yml run --rm django coverage html
    $ open htmlcov/index.html

#### Running tests with py.test

    $ docker-compose -f local.yml run --rm django  pytest

### Live reloading and Sass CSS compilation

Moved to [Live reloading and SASS
compilation](http://cookiecutter-django.readthedocs.io/en/latest/live-reloading-and-sass-compilation.html).

## Deployment

This application is hosted on Heroku.

See detailed [cookiecutter-django Heroku
documentation](http://cookiecutter-django.readthedocs.io/en/latest/deployment-on-heroku.html).

## Settings

Moved to
[settings](http://cookiecutter-django.readthedocs.io/en/latest/settings.html).
