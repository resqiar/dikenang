<p align="center">
  <a href="https://dikenang.netlify.app" target="blank"><img src="https://i.imgur.com/irBDntm.png" width="600" alt="Dikenang Logo" /></a>
</p>
 <h4 align="center">dikenang is a private social media that focused on sharing memories to the linked relationship partners</h4>
 <p align="center">(Early Development in Progress)</p>
<p align="center">
  <a href="https://github.com/resqiar/dikenang-server">
    <img src="https://img.shields.io/github/languages/top/resqiar/dikenang-server?style=for-the-badge" alt="dikenang - top language" />
  </a>
  <a href="https://github.com/resqiar/dikenang-server">
    <img src="https://img.shields.io/github/license/resqiar/dikenang-server?style=for-the-badge" alt="dikenang - top language" />
  </a>
  <a href="https://github.com/resqiar/dikenang-server">
    <img src="https://img.shields.io/github/last-commit/resqiar/dikenang-server?style=for-the-badge" alt="dikenang - top language" />
  </a>
  <a href="https://github.com/resqiar/dikenang-server">
    <img src="https://img.shields.io/github/stars/resqiar/dikenang-server?style=for-the-badge" alt="dikenang - stars" />
  </a>
  <a href="https://github.com/resqiar/dikenang-server">
    <img src="https://img.shields.io/github/forks/resqiar/dikenang-server?style=for-the-badge" alt="dikenang - fork" />
  </a>
</p>


## What is dikenang?

Dikenang is actually my private project with my girlfriend, moved to public lately. Dikenang is a private social media used by me and my girlfriend to share our memories together. dikenang is like Facebook, Instagram, Quora, or whatever social media that exist, it should do its job to post a picture, video, conversation sound, story, etc, but with extra features that should protect its privacy and uniqueness. see [dikenang.netlify.app](https://dikenang.netlify.app) for preview (though you wouldn't be able to login/signup yet).

## What is this Repo contains?

**This repository only contains server-side code** that will used in dikenang's client-side applications in the future. This repository was created on top of NestJS framework, which is typescript support out of the box. **Please take in mind that this project is in the early stages of development.**

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

## Stay in touch

- Author - [Resqiar](https://github.com/resqiar)
- Website - [https://dikenang.netlify.app](https://dikenang.netlify.app)
- Instagram - [@resqiar_](https://instagram.com/resqiar)

## License

dikenang is [MIT licensed](LICENSE).
