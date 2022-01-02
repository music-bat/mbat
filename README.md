<br/>
<p align="center">
  <a href="https://github.com/music-bat/mbat">
    <img src="images/logo-small.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">mBat - Music for you and your Friends</h3>

  <p align="center">
    An app for creating playlists including songs you and your friends like!
    <br/>
    <br/>
    <a href="https://music-bat.com"><strong>Visit the Website »</strong></a>
    <br/>
    <br/>
    <a href="https://dev.music-bat.com">View Development App</a>
    .
    <a href="https://github.com/music-bat/mbat/issues">Report Bug</a>
    .
    <a href="https://github.com/music-bat/mbat/issues">Request Feature</a>
  </p>
</p>

 [![Build and Deploy API](https://github.com/music-bat/mbat/actions/workflows/api-build-deploy.yml/badge.svg)](https://github.com/music-bat/mbat/actions/workflows/api-build-deploy.yml) 
 [![Build and Deploy PWA](https://github.com/music-bat/mbat/actions/workflows/pwa-build-deploy.yml/badge.svg)](https://github.com/music-bat/mbat/actions/workflows/pwa-build-deploy.yml) 
 [![Maintainability](https://api.codeclimate.com/v1/badges/33abbeceae58814529e0/maintainability)](https://codeclimate.com/repos/6122c74e91a22e0c9200000e/maintainability)
 [![Test Coverage](https://api.codeclimate.com/v1/badges/33abbeceae58814529e0/test_coverage)](https://codeclimate.com/repos/6122c74e91a22e0c9200000e/test_coverage)
 ![Contributors](https://img.shields.io/github/contributors/music-bat/mbat?color=dark-green) ![Issues](https://img.shields.io/github/issues/music-bat/mbat) ![License](https://img.shields.io/github/license/music-bat/mbat) 

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<a href="https://www.patreon.com/perzeuss" title="Become a patreon"> 
  <img alt="Become a patreon" src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="200">
</a>

## Table Of Contents
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)

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

Distributed under the MIT License. See [LICENSE](https://github.com/music-bat/mbat/blob/main/LICENSE.md) for more information.

## Project Setup

### Requirements
This project contains the source code for backend (e.g. /apps/api) and frontend (e.g. /apps/pwa). Your local setup must meet the following requirements to get the whole ecosystem (api, apps, databases) running on a local machine.

Node.js >=16.0.0 is required to run the backend and frontend code. Docker >= 19.03.0 is required to host local database instances.

### Get Started
Read our [Getting Started Guide](docs/GETTING_STARTED.md) to get everything up and running.
If you follow all Getting Started steps, you'll be able to explore the local app, the database or start contributing to this awesome project!

#### Neo4j Dashboard
The Neo4j Dashboard will be available under http://localhost:7474/browser/. Use it to verify database changes you make when working with our neo4j api service.

#### Parse Dashboard
The Parse Dashboard will be available under http://localhost:4040. Use it to manage data in our mongodb. Never connect directly to the mongodb instance to change data!

### Development server

* Run `nx serve-ssr pwa` to start the pwa dev server with ssr. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
* Run `npm run start:cloud` and `nx serve api` to start the api dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test app-name` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e app-name` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

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
