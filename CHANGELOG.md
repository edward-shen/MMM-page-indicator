# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.4](https://github.com/edward-shen/MMM-page-indicator/compare/v0.3.3...v0.3.4) - 2025-10-03

### Added

- chore: add Dependabot configuration for GitHub Actions and npm updates

### Changed

- chore: update devDependencies
- chore: update GitHub Actions to use latest versions of checkout and setup-node
- style: enhance layout of indicators and circle wrappers for better alignment
  MagicMirror² switched to `flex` layout in v2.32.0 which caused misalignment. This update addresses that by refining the CSS.
- style: reorder .circle-wrapper styles for improved readability

## [0.3.3](https://github.com/edward-shen/MMM-page-indicator/compare/v0.3.2...v0.3.3) - 2025-06-25

### Changed

- chore: add `"type": "module"` to `package.json`
- chore: add `prettier`, `husky` and `lint-staged` for improved linting and formatting
- chore: remove superfluous ESLint settings
- chore: remove unnecessary `directories` field from `package.json`
- chore: update devDependencies
- refactor: streamline notification handling with switch-case structure

### Fixed

- chore: handle `prettier` issues
- docs: fix wording in README.md

## [0.3.2](https://github.com/edward-shen/MMM-page-indicator/compare/v0.3.1...v0.3.2) - 2025-05-25

### Changed

- chore: add automated tests workflow
- chore: add debug log for circle addition in page indicator
- chore: add spell checker and fix typos
- chore: update devDependencies
- docs: clarify path to `custom.css`
- docs: enhance module description
- docs: optimize configuration section

### Fixed

- fix: add `bright` class to active indicator only if `activeBright` is `true`

## [0.3.1](https://github.com/edward-shen/MMM-page-indicator/compare/v0.3.0...v0.3.1) - 2025-05-17

### Changed

- chore: lint also `css`, `json` and `markdown`
- chore: update devDependencies
- chore: update scripts to use `node --run`
- docs: simplify installation section, add update section and optimize changelog link

## [0.3.0](https://github.com/edward-shen/MMM-page-indicator/compare/v0.2.1...v0.3.0) - 2025-04-11

### Added

- feat: add indicator classes for easier styling (#17)
- feat: add page number tooltip (#17)
- docs: add examples for using new indicator classes in README
- chore: add CHANGELOG file
- chore: add package.json
- chore: add Code of Conduct

### Changed

- chore: review README
  - add 'Project Status' section
  - move 'notifications' section to the end
  - add link to LICENSE file
  - some minor changes
- chore: switch LICENSE file to markdown for better readability
- chore: chore: replace deprecated ESLint config by flat config
- refactor: nest all CSS settings to avoid conflicts with other modules

## [0.2.1](https://github.com/edward-shen/MMM-page-indicator/compare/v0.2.0...v0.2.1) - 2022-11-18

## [0.2.0](https://github.com/edward-shen/MMM-page-indicator/compare/v0.1.2...v0.2.0) - 2021-12-08

## [0.1.1](https://github.com/edward-shen/MMM-page-indicator/compare/v0.1.1...v0.1.2) - 2020-06-03

## [0.1.1](https://github.com/edward-shen/MMM-page-indicator/compare/v0.1.0...v0.1.1) - 2018-05-07

## [0.1.0](https://github.com/edward-shen/MMM-page-indicator/compare/v0.0.1...v0.1.0) - 2017-06-19

## [0.0.1](https://github.com/edward-shen/MMM-page-indicator/releases/tag/v1.0.0) - 2017-06-17

Initial release.
