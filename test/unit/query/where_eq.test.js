import chai from 'chai';
import Eq from '../../../src/query/where/clauses/eq';

let expect = chai.expect;

describe('Eq', () => {
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

  it('name == "kris"', done => {
    let eq = new Eq('name', 'kris');
    eq.options = options;
    expect(eq.where).to.eql(`[?e :person/name 'kris']`);
    expect(eq.build()).to.eql({
      ':where': `[?e :person/name 'kris']`
    });
    done();
  });

  it('age == 32, not inline mode', done => {
    let eq = new Eq('age', 32);
    expect(eq.where).to.eql(`[?e ?age ?age-value]`);
    done();
  });
});
