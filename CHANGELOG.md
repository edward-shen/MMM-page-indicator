# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.3.6](https://github.com/edward-shen/MMM-page-indicator/compare/v0.3.5...v0.3.6) (2026-02-14)


### Performance Improvements

* optimize click handler and add payload validation ([227cdc2](https://github.com/edward-shen/MMM-page-indicator/commit/227cdc22bfafdc027b7bca5d07ea5a1bf94e677d))
* remove duplicate DOM update in click handler ([9f2910c](https://github.com/edward-shen/MMM-page-indicator/commit/9f2910ced6e50b4e7b5a6e1b4d5bc0bf28443f64))


### Chores

* add demo config file and package.json script ([943d8fb](https://github.com/edward-shen/MMM-page-indicator/commit/943d8fb73cf9b38b95bdff8a39c33a38bd7019f0))
* add release script ([9c695af](https://github.com/edward-shen/MMM-page-indicator/commit/9c695af6c0bd01a6de94ee3c074a5b83bdf9148c))
* change runner from ubuntu-latest to ubuntu-slim in automated tests ([ef3041e](https://github.com/edward-shen/MMM-page-indicator/commit/ef3041e20178a224d0fb8f527ef604671a55c0cb))
* replace husky with simple-git-hooks for pre-commit linting ([4581aae](https://github.com/edward-shen/MMM-page-indicator/commit/4581aae23c3fa229771a851293d768c7983c512a))
* update devDependencies and ESLint config ([d60f215](https://github.com/edward-shen/MMM-page-indicator/commit/d60f215bf27de341a53463cf45a010f19a7bbb07))
* update GitHub Actions to use latest versions of checkout and setup-node ([1308384](https://github.com/edward-shen/MMM-page-indicator/commit/1308384f3dc480c723a607574fa1eff3830bd141))


### Tests

* add comprehensive unit test suite with node:test ([a71b874](https://github.com/edward-shen/MMM-page-indicator/commit/a71b8741a6758120aec3abb22f6fe1492ecc746e))

## [0.3.5](https://github.com/edward-shen/MMM-page-indicator/compare/v0.3.4...v0.3.5) - 2025-10-17

### Added

- docs: add example for rectangular progress-style indicators with CSS and GIF
- feat: add issue templates for bug reports and feature requests

### Changed

- chore: update devDependencies

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
