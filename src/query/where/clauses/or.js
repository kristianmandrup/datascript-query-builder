import Base from './base';
import Builder from '../builder';

export default class Or extends Base {
  constructor(obj, where) {
    super();
    this._where = where;
    var key = Object.keys(obj)[0];
    this.key = key
    this.keyName = key.slice(1); // $or
    if (!this.keyName === 'or') {
      // console.error(obj);
      throw 'Or must be an object with an or key';
    }
    // group each key/value into a list
    this.list = obj[this.keyName];
  }

  // $or: or (either)
  // Simple
  //   {$or: [{name: 'Alice'}, {name: 'Bob'}]}

  // Potentially recursive:
  //   {$or: [{name: {'$ne': 'Alice'}, {age: {'$gte': 21}]}
  build() {
    return {
      ':where': this.where
    };
  }

  get where() {
    return `(or ${this.clauses.join(' ')})`;
  }

  get clauses() {
    var clauses = this.list.reduce((prev, next) => {
      var clause = this.clause(next);
      return prev.add(clause);
    }, new Set());
    return Array.from(clauses);
  }

  clause(obj) {
    return Builder.create(obj).build(this._where);
  }
}

Or.create = (obj, where) => {
  return new Or(obj, where);
};
