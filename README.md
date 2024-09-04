# Name

Food Truck Microservice

# Description

This is an application that parses, transforms, and ingests a CSV list of food truck data into defined postgres tables. The data is exposed via a GET endpoint with pagination functionality. Upon starting up the project, the node.js app will start up along with a dockerized postgres instance. The api endpoints are configured to communicate with docker postgres and they are fully isolated from each other.

Node.js runtime was used to speed up development work, express being the http library for ease of use. Docker was used to host postgres so that the runtime is standardized regardless of operating system. Typeorm was chosen as the ORM for postgres for it's ease of use and simple configuration.

# Getting Started

## Dependencies

On your local machine you should have the following tools and versions installed:

- node version 20.11.1
- npm version 10.2.4
- Docker version 20.10.12
- Docker Compose version v2.2.3.

## Start the project

1. Clone this repository to your local machine
2. Make sure you are in the root directory of the project and run `npm install`
3. Run `make start`
4. Trigger the csv data to be ingested by hitting POST http://localhost:3000/data/seed. No body or params are necessary. Use any http client you would like. I enjoy using postman.
   ![alt text](image.png)
5. Fetch the data using GET http://localhost:3000/data. This is a paginated api so feel free to pass in a limit, and/or how many records to skip.
   example: http://localhost:3000/data?limit=5&skip=100 this will return 5 records to the client, skipping the first 100.
6. When you are done using the project, simply run `make down` and the docker postgres instance and node.js server will shut down gracefully.
