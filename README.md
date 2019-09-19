# HUBCORE FRONTEND

### Installation

```
// install packages
npm install

// run in development mode
npm run dev

// start optimized production build
npm start

// start linting
npm run lint

// fix linter
npm run lint:fix
```

## Code guideline

To make code of good quality, we need to agree to follow these code guidelines:

### Name conventions

* All filenames should be written in lowercase with dash for word splitting. Examples: `counter.js`, `my-new-class.js`
* All class names should be written in PascalCalse. Examples: `MyClass`, `Counter`
* All variables should be written in camelCase. Example: `myVar`, `users`
* The commit messages should start from an uppercase letter and phrased to continue the words "when applied, this commit will...". For example: `Fix a linting error` (when applied, this commit will fix a linting error), `Add new functionality`
* The branch names should start with the type of the brahcn divided with slash with the name part that is in lowercase with dashes (-) to separate words. For example: `feature/new-page`, `fix/markup-styling`

### Proper structure
This part of the guideline inherit the [Next.js behavior](https://nextjs.org/docs#routing)

* `pages` directory is a routing. Each file is a route with name as pathname
* `containers` directory contains the logic components. Pages should use only them
* `components` directory is for small dummy-components. The don't do the logic - just display some template
* `styles` directory contains global *css* files. They are included in *pages/_app.js*
* `redux` directory containers the Redux store with its actions and reducers to manage the global state
* `constants` directory should contain plain js/json files with static objects or arrays declarations
* `static` directory should contain images and statiic css that could be included from a template
* `utils` directory should containt helper functions that are used im more than one components

### Git flow

To properly divide the teamwork, do code reviews and keep it clean we have to follow [these standarts](https://datasift.github.io/gitflow/IntroducingGitFlow.html) (!Important to know). Some notes:

* `master` branch for releases only
* `develop` branch for testing (staging)
* `feature/*` or `fix/*` or any other conventional name is for your development
* To merge your branch into develop, create a Pull Request (PR), assign yourself to it and add reviews. Then wait for the review and merge in case of success.

## License
This project is licensed under the terms of the MIT license
