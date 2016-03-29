# datascript-query-builder

Datascript query builder

[![Travis build status](http://img.shields.io/travis/kristianmandrup/datascript-query-builder.svg?style=flat)](https://travis-ci.org/kristianmandrup/datascript-query-builder)
[![Code Climate](https://codeclimate.com/github/kristianmandrup/datascript-query-builder/badges/gpa.svg)](https://codeclimate.com/github/kristianmandrup/datascript-query-builder)
[![Test Coverage](https://codeclimate.com/github/kristianmandrup/datascript-query-builder/badges/coverage.svg)](https://codeclimate.com/github/kristianmandrup/datascript-query-builder)
[![Dependency Status](https://david-dm.org/kristianmandrup/datascript-query-builder.svg)](https://david-dm.org/kristianmandrup/datascript-query-builder)
[![devDependency Status](https://david-dm.org/kristianmandrup/datascript-query-builder/dev-status.svg)](https://david-dm.org/kristianmandrup/datascript-query-builder#info=devDependencies)

### Development

Write your code in `src`. The entry file is what you named the project in kebab case ([although the filename
can be changed](https://github.com/babel/generator-babel-boilerplate#i-want-to-change-the-primary-source-file)).

Run `npm run build` to compile the source into a distributable format.

Put your unit tests in `test/unit`. The `npm test` command runs the tests using Node. If your library / tests
require the DOM API, see the `test/setup/node.js` file.

### npm Scripts

- `npm test` - Lint the library and tests, then run the unit tests
- `npm run lint` - Lint the source and unit tests
- `npm run watch` - Continuously run the unit tests as you make changes to the source
   and test files themselves
- `npm run test-browser` - Build the library for use with the browser spec runner.
  Changes to the source will cause the runner to automatically refresh.
- `npm run build` - Lint then build the library
- `npm run coverage` - Generate a coverage report

### Browser Tests

The [browser spec runner](https://github.com/babel/generator-babel-boilerplate/blob/master/test/runner.html)
can be opened in a browser to run your tests. For it to work, you must first run `npm run test-browser`. This
will set up a watch task that will automatically refresh the tests when your scripts, or the tests, change.