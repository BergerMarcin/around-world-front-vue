# around-world-front-vue

✈️ 🌐️ Travel around the world! 🌍️ 🛌️ Find your hotel! 🏄‍♀️️ 🏖️

This is demo frontend app in **Vue3** (+ **TS**, **Pinia**, **Vue Router**) with **Vite** build tool.

## 🛣️ Roadmap (FE & BE) 🚧

### FE part 1 - basic functionalities

1. ~~Try implementation of `vue-leaflet` thought stoped development of this package (insted custom applying `leaflet` in Vue3)~~
2. ~~Create local JSON-server as source of hotel data~~
3. ~~Move hotels to `store` (`Pinia`)~~
4. ~~Create correct fetching data with Axios (http-client, api-service, error handling, error notification, validate/typeguard data/DTO)~~
6. ~~Grouping markers in case they are close each other. Style~~
7. ~~Hotel modal on popup click. Modal with hotel details & ATC (add-to-cart).~~
8. Cart modal with remove-item & buy-all CTA buttons
---
9. ~~Scrape hotel data & add to JSON-fixture~~
10. Add searching by `localization` & `date` & `dateAccurancy` (add them to `store`)

### BE & DB

1. Create non-SQL `Mongo DB` with hotel data
2. Move data from JSON to DB
3. Create server `express.js`
4. Connect server with DB
5. Create endpoint:

- hotels?latRange&lngRange&dateRange&dateAccurancy&

6. Add JWT token
7. Basic unit-tests

### FE part 2

1. Move hotels from JSON-server to BE
2. Basic unit-tests
3. Basic e2e tests (Playwright)

### Future
1. Authorization

<hr/><br/><br/>

# DEV

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
