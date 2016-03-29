import { QueryBuilder, Result } from '../../src';
import chai from 'chai';
let expect = chai.expect;

describe('Datascript QueryBuilder', () => {
  describe('Greet function', () => {
    beforeEach(() => {
    });

    it('should have been run once', () => {
      expect(QueryBuilder).to.exist;
    });

    it('should have always returned hello', () => {
      expect(Result).to.exist;
    });
  });
});
