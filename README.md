# Project has been archived
This project has been archived and is no longer maintained. The development has stopped and the project is not in use anymore. If you want to continue the development, feel free to fork the project and continue the development on your own.

<br/>

 [![Build and Deploy API](https://github.com/music-bat/mbat/actions/workflows/api-build-deploy.yml/badge.svg)](https://github.com/music-bat/mbat/actions/workflows/api-build-deploy.yml) 
 [![Build and Deploy PWA](https://github.com/music-bat/mbat/actions/workflows/pwa-build-deploy.yml/badge.svg)](https://github.com/music-bat/mbat/actions/workflows/pwa-build-deploy.yml) 
 [![Maintainability](https://api.codeclimate.com/v1/badges/33abbeceae58814529e0/maintainability)](https://codeclimate.com/repos/6122c74e91a22e0c9200000e/maintainability)
 [![Test Coverage](https://api.codeclimate.com/v1/badges/33abbeceae58814529e0/test_coverage)](https://codeclimate.com/repos/6122c74e91a22e0c9200000e/test_coverage)
 ![Contributors](https://img.shields.io/github/contributors/music-bat/mbat?color=dark-green) ![Issues](https://img.shields.io/github/issues/music-bat/mbat) ![License](https://img.shields.io/github/license/music-bat/mbat) 

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Table Of Contents
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Project Setup](#project-setup)
* [Contributors](#contributors-)

## Roadmap

See the [open issues](https://github.com/music-bat/mbat/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open a discussion](https://github.com/music-bat/mbat/discussions/new?category=ideas) to discuss it.
* Please make sure you check your spelling and grammar.
* Please also read through the [Code Of Conduct](https://github.com/music-bat/mbat/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes following the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) (`git commit -m 'feat(pwa): add amazing-feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/music-bat/mbat/blob/main/LICENSE) for more information.

## Project Setup

### Requirements
This project contains the source code for backend (e.g. /apps/api) and frontend (e.g. /apps/pwa). Your local setup must meet the following requirements to get the whole ecosystem (api, apps, databases) running on a local machine.

Node.js >=16.0.0 <= 17.0.0 is required for the javascript tooling and to build the backend and frontend code. Docker >= 19.03.0 is required to host local database instances.

### Get Started
Read our [Getting Started Guide](docs/GETTING_STARTED.md) to get everything up and running.
If you follow all getting started steps, you'll be able to explore the local running app, the database or start contributing to this awesome project!

#### Neo4j Dashboard
The Neo4j Dashboard will be available under http://localhost:7474/browser/. Use it to verify database changes you make when working with our neo4j api service.

#### Parse Dashboard
The Parse Dashboard will be available under http://localhost:4040. Use it to manage data in our mongodb. Never connect directly to the mongodb instance to change data!

### Development server

* Run `nx serve-ssr pwa` to start the pwa dev server with ssr. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
* Run `npm run start:cloud` and `nx serve api` to start the api dev server.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test pwa` to execute the unit tests via [Jest](https://jestjs.io) in our frontend.

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e pwa-e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io). This command will also run `ng serve pwa` before cypress tests are executed!

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!--- cSpell:disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/perzeuss"><img src="https://avatars.githubusercontent.com/u/11357019?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pascal M</b></sub></a><br /><a href="#projectManagement-perzeuss" title="Project Management">📆</a> <a href="#business-perzeuss" title="Business development">💼</a> <a href="https://github.com/music-bat/mbat/commits?author=perzeuss" title="Code">💻</a> <a href="https://github.com/music-bat/mbat/commits?author=perzeuss" title="Documentation">📖</a> <a href="#design-perzeuss" title="Design">🎨</a> <a href="#infra-perzeuss" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/mavolin"><img src="https://avatars.githubusercontent.com/u/48887425?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maximilian von Lindern</b></sub></a><br /><a href="#ideas-mavolin" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>
<!--- cSpell:enable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
