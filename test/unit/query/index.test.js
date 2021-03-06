import Query from '../../../src/query';
import chai from 'chai';

let expect = chai.expect;

describe('Query', () => {
  // before(clean);
  // after(clean);

  beforeEach(done => {
    done();
  });

  afterEach(done => {
    done();
  });

  let query = new Query('person', {
    name: 'kris',
    age: {$gt: 32},
    status: {$in: ['single', 'divorced']},
    role: {$nin: ['slave']},
    $or: [
      { name: 'Alice' },
      { name: 'Bob' }
    ]
  });
  // query.options = {mode: 'inline'}

  let built = query.build();
  let q = built.query;
  let params = built.params;

  let whereClauses = [
      '[?e ?name ?name-value]',
      '[(> ?e ?age ?age-value)]',
      '[?e ?status ?status-value]',
      '(not [?e ?role ?role-value])',
      '(or [?e ?name ?name-value])'
  ];

  let expected = {
    // FIX: do we want status-value in find?
    // TODO: should we discard :find and use pull?
    // or at least have this option?
    ':find': `?name-value ?age-value ?status-value ?role-value`,
    // ':in': `?name-value ?age-value [?status-value ...] [?role-value ...]`,
    ':in': '?name ?name-value ?age ?age-value ?status [?status-value ...] ?role [?role-value ...]',
    ':where': whereClauses
  };

  it('builds :find clause', done => {
    // ':find': '?name-value ?age-value',
    // ':in': '$ ?name ?age',
    expect(q[':find']).to.eql(expected[':find']);
    done();
  });

  it('builds :in clause', done => {
    // ':find': '?name-value ?age-value',
    // ':in': '$ ?name ?age',
    expect(q[':in']).to.eql(expected[':in']);
    done();
  });

  it('builds :where clause', done => {
    // ':find': '?name-value ?age-value',
    // ':in': '$ ?name ?age',
    expect(q[':where']).to.eql(expected[':where']);
    done();
  });

  it('builds param values', done => {
    // ':find': '?name-value ?age-value',
    // ':in': '$ ?name ?age',
    expect(params.values).to.eql(['kris', 32, ['single', 'divorced'], ['slave'], 'Alice', 'Bob']);
    done();
  });

  it('builds param names', done => {
    // ':find': '?name-value ?age-value',
    // ':in': '$ ?name ?age',
    expect(params.names).to.eql(['name', 'age', 'status', 'role']);
    done();
  });

  it('builds full query', done => {
    // ':find': '?name-value ?age-value',
    // ':in': '$ ?name ?age',
    expect(q).to.eql(expected);
    done();
  });
});
