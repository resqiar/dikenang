FROM node:14-alpine

RUN rm -fr node_modules

# Copy in only the parts needed to install dependencies
# (This avoids rebuilds if the package.json hasn’t changed)
COPY package*.json yarn.lock ./

# Install dependencies (including dev dependencies)
RUN yarn install

# Copy in the rest of the project
# (include node_modules in a .dockerignore file)
COPY . .

# Build the project
RUN yarn build

# Set runtime metadata
EXPOSE 3001
CMD [ "yarn", "start" ]