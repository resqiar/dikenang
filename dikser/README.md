## Server Tech-Stack

-   NestJS Framework
-   Typescript
-   GraphQL
-   PostgreSQL
-   Typeorm
-   Websocket

## Server Milestones

-   [x] Create User with email and password
-   [x] Login with email and password
-   [x] JWT Token
-   [x] Create Post with/without attachments(imageUrl, videoUrl, etc)
-   [ ] Verify email
-   [ ] Signup with google
-   [ ] Each Post should have like/upvote and comment fields
-   [ ] Websocket connections
-   [ ] User should update their bio/avatarUrl in real-time
-   [ ] Post should show comments and like/upvote in real-time
-   [ ] Each User should have a partner relations field (Optional)
-   [ ] Post must be shared to partner by default
-   [ ] More...

## Easy Running Using Docker

Easy installation without bothering .env file, installing a database, packages, etc, simply install docker and run the following commands, and the server will start on [localhost:3000](http://localhost:3000)

_Prerequisites: installed docker & docker-compose in your system_

1. Make sure you are in the root folder, **if you are in `/dikser` directory**, run this following command:

```bash
# navigate back to root folder
$ cd ..
```

2. Start docker-compose

```bash
# start container process
$ docker-compose up
```

> If you want to run with your own config, see <a href="https://github.com/resqiar/dikenang/blob/main/docker-compose.yml">docker-compose.yml</a>

3. Server is now running

```bash
# open graphql playground
$ xdg-open http://localhost:3000/graphql
```

## Manual Installation

1. Make sure you are in the `dikser/` folder, **if you are in `root` directory**, run this following command:

```bash
# navigate to dikser directory
$ cd dikser/
```

2. Install dependencies

```bash
$ yarn install
```

3. Rename `sample-env.txt` to `.env`, then satisfy all the required values.

```
# Database Configurations
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

# Jwt Secret Key
JWT_SECRET=
```

> You may need to create and spin up your own Postgres database to get configurations value

4. Running the server

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

Server index endpoint is on `localhost:3000` and graphQL endpoint is by default `localhost:3000/graphql`

5. Test Commands

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
