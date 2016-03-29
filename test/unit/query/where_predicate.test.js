import chai from 'chai';
import Predicate from '../../../src/query/where/clauses/predicate';
import Builder from '../../../src/query/where/builder';

let expect = chai.expect;

describe('Predicate', () => {
  // before(clean);
  // after(clean);

  beforeEach(done => {
    done();
  });

  afterEach(done => {
    done();
  });

  let options = {mode: 'inline', entityName: 'person'};
  let where = {};

  it('age > 32', done => {
    let pred = new Predicate('age', {$gt: 32}, where);
    pred.options = options;
    let exp = pred.build()[':where'];
    expect(exp).to.eql(`[(> ?e :person/age 32)]`);
    done();
  });

  it('age < 32', done => {
    let pred = new Predicate('age', {$lt: 32}, where);
    pred.options = options;
    let exp = pred.build()[':where'];
    expect(exp).to.eql(`[(< ?e :person/age 32)]`);
    done();
  });
});
