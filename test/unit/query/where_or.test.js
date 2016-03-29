import chai from 'chai';
import Or from '../../../src/query/where/clauses/or';

let expect = chai.expect;

describe('Or', () => {
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

  it('name == "kris" or age > 32', done => {
    let or = new Or({$or: [
      {name: 'kris',},
      {age: {$gt: 32}},
    ]});
    let expected = `(or [?e ?name ?name-value] [(> ?e ?age ?age-value)])`;

    expect(or.where).to.eql(expected);
    // expect(or.build()).to.eql({
    //   ':where': expected
    // });
    done();
  });
});
