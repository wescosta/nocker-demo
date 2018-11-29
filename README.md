# Nocker Demo

A Dockerized Node.js + MongoDB demo app featuring a simple blog rest API.

## Run it

**Note: In order to run this project you must have Docker installed.**

To run it, simply execute the `docker-compose up` command and `docker-compose stop` to stop the application. If you wish to stop and remove the container, you may do so by running `docker-compose down`.

Once the app is running, open your browser on [http://localhost](http://localhost).

## Scale it up or down

With the `docker-compose scale` command, it is very simple to scale your app up or down.

Example:

`docker-compose scale api=5 web=2`

## Proxy and Load balancer

There are two web servers running, one to serve the web app and its static artifacts and another to serve the express rest API. For that we use [Nginx is configured as a reverse proxy and a load balancer](./proxy/proxy.conf). Thus requests to [http://localhost](http://localhost) are redirected to the web app and requests to [http://localhost/api](http://localhost/api) are routed to the api.

## API Endpoints

### Posts 
- GET [/api/{id}](http://localhost/api/5bfec4281a9bd4001f8ab8df) - Loads a single blog post by id
- GET [/api/{page}/{limit}](http://localhost/api/1/10) - Loads paginated blog posts
- DELETE /api/{id} - Deletes a blog post
- PUT   /api/{id}  - Updates a blog post by id - [body schema](./api/model/post.model.mjs)
- POST /api/{id}   - Creates a new blog post   - [body schema](./api/model/post.model.mjs)

### Utililty
- GET [/api/health](http://localhost/api/health) - Checks if the api is up and running
- GET [/api/populate](http://localhost/api/populate) - Populates the database with [test data](./api/data/prepopulate-data.json)

## Tooling Used

The following tools were used on this demo:

- [Docker](http://www.docker.com)
- [MongoDB](http://www.mongodb.com)
- [Node.js](http://www.nodejs.org)
- [Nginx](http://www.nginx.com)
- [Express.js](http://www.expressjs.com)
- [Preact](http://www.preactjs.com)