## Server Tech-Stack

- NestJS Framework
- Typescript
- GraphQL
- PostgreSQL
- Typeorm
- Websocket

## Server Milestones

- [x] Create User with email and password
- [x] Login with email and password
- [x] JWT Token
- [x] Create Post with/without attachments(imageUrl, videoUrl, etc)
- [ ] Each Post should have like/upvote and comment fields
- [ ] Websocket connections
- [ ] User should update their bio/avatarUrl in real-time
- [ ] Post should show comments and like/upvote in real-time
- [ ] Each User should have a partner relations field (Optional)
- [ ] Post must be shared to partner by default
- [ ] More...

## Server Installation

Install dependencies
```bash
$ yarn install
```
Copy all `sample-env.txt`, create new file `.env`, then satisfy all the required value.
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

## Running the server

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
Server index endpoint is on `localhost:3000` and graphQL endpoint is by default `localhost:3000/graphql`

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
