# Ferocia Takehome Test - Adam Beck
## Getting started
If you use `nvm`, then please run `nvm use` in the root of this directory. Otherwise, this project uses node `v16.16.0`

Running the following in your terminal will get you started

```sh
npm run getting:started
```

This
- Lints everything
- Builds everything
- Runs all tests

to ensure the application is good to run locally

### Running locally

Run the following in your terminal

```sh
npm run dev
```

### Tests

To run the tests, please run the following in your terminal

```sh
npm run test
```

All tests are located in the `./tests` directory. Coverage reports can be generated via `npm run test:coverage`.

While not _everything_ is tested, I chose to cover the items that provide
the "happy path" functionality as well as the most bang-for-buck to ensure the application is working as advertised.

## Notes

The project is littered with comments and I encourage
you to explore the application to understand my thinking
as well as the context I built up while developing the project.

### Project Strucutre

All application source code is stored in the `src` directory. All modular react components are stored in the `Components` directory, where as all NextJS pages are stored in the `pages` directory as per convention.

#### Components

Components are grouped by loose domain boundaries (form stuff in the `form` directory, learn more modals in the learn more directory). I tried to stay away from the barrel-file pattern to improve search-ability and context gathering by new maintainers.

#### Domain

Similarlly to `Components`, non-interface based logic is organised into loose domains under the `domain` directory. The idea is that this would provide a somewhat scalable way to continue to add functionality to this project as time (and features) progress.

#### Types

When there are too many types in one file, I've broken them out into a `types.ts` file in the appropriate `domain` directory (such as the `domain/compound-interest/types.ts`) file.

This is to avoid additional typing noise in files that provide functionality.

#### Accessibility

I developed this project using my understanding of web-accessibility standards. The modals implement focus-jails (thanks to @headlessui), links respect the `enter` key, and the input fields are tab-able. `aria-*` attributes are used throughout, as well as `tailwind`s `sr-only` class to provide additional context to users who use a screen reader.

### Tech used

I chose to use `typescript,` `nextjs`, `react` and `tailwind` to build this project.
I feel like I'm productive in those technologies, and they allowed me to strike a balance
between creating a UI and structing my project in a readable way.

#### Tailwind

I chose to use tailwind as it abstracts a large number of low level CSS concerns.
I find that it is a more performant option in comparison to CSS in JS options and something
like css modules. It also allowed me to use @headlessui in order to make accessible modals.

#### NextJS

NextJS _has_ to be the simplest way to get started with a react project. I find the
development ergonomics extreamly comfortable (fast refresh, error messages in the browser)
and I also find that most issues I run into a easily google-able.

#### Zod

A fantastic library for parsing and validating external data when using typescript. It provides helpful APIs and typesafety to easily traverse invalid inputs and error messages.
