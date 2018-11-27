# Nocker Demo

A Dockerized Node.js + MongoDB demo app featuring a simple blog rest API.

## Run it

Note: In order to run this project you must have Docker installed.

To run it, simply execute the `docker-compose up` command and `docker-compose stop` to stop the application. If you wish to stop and remove the container, you may do so by running `docker-compose down`.

## Scale it up or down

With the `docker-compose scale` command, it is very simple to scale your app up or down.

Example:

`docker-compose scale api=5 web=2`