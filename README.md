# datascript-query-builder

Datascript query builder

[![Travis build status](http://img.shields.io/travis/kristianmandrup/datascript-query-builder.svg?style=flat)](https://travis-ci.org/kristianmandrup/datascript-query-builder)
[![Code Climate](https://codeclimate.com/github/kristianmandrup/datascript-query-builder/badges/gpa.svg)](https://codeclimate.com/github/kristianmandrup/datascript-query-builder)
[![Test Coverage](https://codeclimate.com/github/kristianmandrup/datascript-query-builder/badges/coverage.svg)](https://codeclimate.com/github/kristianmandrup/datascript-query-builder)
[![Dependency Status](https://david-dm.org/kristianmandrup/datascript-query-builder.svg)](https://david-dm.org/kristianmandrup/datascript-query-builder)
[![devDependency Status](https://david-dm.org/kristianmandrup/datascript-query-builder/dev-status.svg)](https://david-dm.org/kristianmandrup/datascript-query-builder#info=devDependencies)

## Query Builder based on FeatherJS query syntax

This syntax is inspired by MongoDB query syntax

- [pagination](http://docs.feathersjs.com/databases/pagination.html)
- [querying](http://docs.feathersjs.com/databases/querying.html)

### Design

This Query builder consists of the following:
- QueryBuilder
  - Entity
  - Pull
  - Query
- Result

`Entity` is used to access entity data directly (via index). We use it to find all ids for a given Entity class.

`Pull` can use the Pull one and Pull many APIs to retrieve specific Entity attribute data for one or more entities (by Id).

`Query` is a general purpose query, used for finding Entity data that match specific criteria/constraints (ie. predicates etc.).

The `QueryBuilder` is a facade to all the different query variants.

`QueryBuilder` API:
- `entities(params)`
- `byId(params)`
- `query(params, options)`

```js
var qb = new QueryBuilder('person', options);
var datalogQuery = qb.query(q1);
var entities = qb.entities('id', options);
var personData = qb.byId({id: 27}, options);
```

`Result` is used to pre-process a query result from datascript/datomic DB.
A result is typically in the form: `[['kris', 32]]` or `[['name', 'kris', 'age', 32]]`
however, we would often like it in JSON map form, like `{name: 'kris', 'age': 32}`.
`Result` is aimed to facilitate this enrichment and also pagination (limiting window/size of results returned) and sorting.

- `var result = new Result(queryResult).build()`

### Usage

```js
import {QueryBuilder, Result} from 'dqb';

// first 10 entities older than 32 years, sorted by name
var query = {
  age: {$gt: 32},
  $limit: 10,
  $sort: {name: 1}
};

// Create Datalog, ie Datascript/Datomic query from FeatherJS query Object
// Search :person entities only...
var result = new QueryBuilder('person', query).build();

// prepare result using special pagination params ($limit, ...)
return new Result(result, query).build();
```

### Development

Write your code in `src`. Run `npm run build` to compile the source into a distributable format.

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
