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
  - Datoms
  - Entity
  - Pull
  - Query
- Result

`Datoms` is used to access entity data directly (via index). We use it to find all ids for a given Entity class. `Entity` is used to access entity data directly. `Pull` can use the Pull one and Pull many APIs to retrieve specific Entity attribute data for one or more entities (by Id).
`Query` is a general purpose query, used for finding Entity data that match specific criteria/constraints (ie. predicates etc.).

The `QueryBuilder` is a facade to all the different query variants.
- `entities(params)`
- `byId(params)`
- `query(params, options)`

`Result` is used to pre-process a query result from datascript/datomic DB.
A result is typically in the form: `[['kris', 32]]` or `[['name', 'kris', 'age', 32]]`
however, we would often like it in JSON map form, like `{name: 'kris', 'age': 32}`.
`Result` is aimed to facilitate this enrichment and also pagination (limiting window/size of results returned) and sorting.

### Usage

In `package.json`

```
  "dqb": "datascript-query-builder"
```

Alternatively clone this repo and `npm link` it locally when "hacking".

API usage:

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
return new Result(result).build();
```

### More usage examples

```js
var qb = new QueryBuilder('person', options);
```

The Datascript Query builder was initially built for use in [feathers-datascript](https://github.com/kristianmandrup/feathers-datascript), a [FeathersJS](www.feathersjs.com) compatible DB driver/adapter.

*Query :person entities matching criteria*

```js
// Query person entities matching criteria
var q1 = {age: {$gt: 32}, 'last-name': 'Johnson'};
var datalogQuery = qb.query(q1).build();
var result = conn.d.q(datalogQuery).then(qResult =>{
  return new Result(qResult).build();
});
```

*Pull :person entity 27*

```js
// Pull :person entity 27
var personPull = qb.byId({id: 27}, options).build();
var params = {$skip: 20, $limit: 20};
var data = conn.d.pull(personPull).then(pulled => {
  return new Result(pulled, params).build();  
});

```

*Fetch all :person entities via index*

```js
// Fetch all :person entities via index
// See: http://augustl.com/blog/2013/datomic_direct_index_lookup/
var datomsQuery = qb.datoms('id', options).build();
var entities = conn.d.datoms(datomsQuery).then(index => {
  var datoms = Entity.unpack(index);
  return conn.d.entity(datoms);
});
```

*Get entity by lookup ref*

```js
// Get entity by lookup ref: email
var lookupRef = qb.entity({email: 'kmandrup@gmail.com'}, options).build();
var person = conn.d.entity(lookupRef).then(entity => {
  return entity;
});
```

### Development/Contribution

This is still early alpha. Please help out ;)

Write the code in `src`. Run `npm run build` to compile the source into a distributable format.

Put unit tests in `test/unit`. The `npm test` command runs the tests using Node.

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
