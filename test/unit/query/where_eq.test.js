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

  it('name == "kris"', done => {
    let eq = new Eq('name', 'kris');
    expect(eq.where).to.eql(`[?e ?name 'kris']`);
    expect(eq.build()).to.eql({
      ':where': `[?e ?name 'kris']`
    });
    done();
  });

  it('age == 32', done => {
    let eq = new Eq('age', 32);
    expect(eq.build()).to.eql(`[?e ?age 32]`);
    done();
  });
});
