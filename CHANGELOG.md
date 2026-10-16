# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.3.9](https://github.com/edward-shen/MMM-page-indicator/compare/v0.3.8...v0.3.9) (2026-10-16)

### Added

* enable keyboard navigation ([2d2a265](https://github.com/edward-shen/MMM-page-indicator/commit/2d2a265084497a0ccbc57c08bbcd0e96881faef5))

### Chores

* add allowScripts config ([9ff30b7](https://github.com/edward-shen/MMM-page-indicator/commit/9ff30b7fa1142f5b05f55722336cf50748073c63))
* simplify prepare script ([b35e5a5](https://github.com/edward-shen/MMM-page-indicator/commit/b35e5a5804b7a57d5f40fb80f894baaa9b3b82e2))
* update devDependencies ([82e7944](https://github.com/edward-shen/MMM-page-indicator/commit/82e7944008b85f17be8efc24085d07ceb6b4f130))
* update GitHub Actions ([803d319](https://github.com/edward-shen/MMM-page-indicator/commit/803d31920295e2cb83a8c87e70aa2f44e0a33a29))
* use ESM changelog config ([b4f9af3](https://github.com/edward-shen/MMM-page-indicator/commit/b4f9af394938409b5d72e2d9010e31a0ba7283d5))

## [0.3.8](https://github.com/edward-shen/MMM-page-indicator/compare/v0.3.7...v0.3.8) (2026-02-25)


### Code Refactoring

* replace deprecated PAGE_CHANGED with PAGE_SELECT in docs and tests ([1288a4f](https://github.com/edward-shen/MMM-page-indicator/commit/1288a4f83382050897ff400e0d1226a80edd2262))

## [0.3.7](https://github.com/edward-shen/MMM-page-indicator/compare/v0.3.6...v0.3.7) (2026-02-23)


### Added

* use PAGE_SELECT notification instead of deprecated PAGE_CHANGED ([ce4474f](https://github.com/edward-shen/MMM-page-indicator/commit/ce4474fd7116b4541b652a2063dd5860ec10b09c))


### Chores

* fix linter issues ([5d9374d](https://github.com/edward-shen/MMM-page-indicator/commit/5d9374dbb7cb6c136157083d9793779b144d91f2))
* update devDependencies ([9529a4c](https://github.com/edward-shen/MMM-page-indicator/commit/9529a4c9ad483f973282d83d22b41b49f1126ebf))

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
