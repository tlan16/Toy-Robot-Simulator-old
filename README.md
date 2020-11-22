# Toy-Robot-Simulator

See [Wiki](https://github.com/tlan16/Toy-Robot-Simulator/wiki) for a requirement details.

# To run

Copy `.npmrc.example` to `.npmrc` and replace `${GITHUB_AUTH_TOKEN}` with your github access token which has read access to github packages.

Or you can set environment variable `GITHUB_AUTH_TOKEN`, but may not work depends on your shell.

Install node dependencies by `yarn --frozen-lockfile` and run `yarn check-node-version` to check you have the required node, npm and yarn version. Using `nvm` is recommended.

To execute the command line interface, run `yarn start`, you should see something like this:
```shell script
➜  Toy-Robot-Simulator git:(main) ✗ yarn start
yarn run v1.22.10
$ yarn build && node dist/main.js
$ yarn check-node-version && tsc -p tsconfig.build.json
$ check-node-version --package
Player Name:
```

# Local development

`yarn dev` to start command line interface with nodemon.

`yarn build` to build the project.

`yarn lint` for linting.

`yarn test` for testing.

# Reporting Issue

Open new issue on github or feel free to email at [franklan118@gmail.com](mailto:franklan118@gmail.com).
