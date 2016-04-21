import Base from './base';
import Eq from './eq';

export default class NotEq extends Eq {
  // name: 'Alice'
  constructor(...args) {
    super(...args);
  }

  get where() {
    return `(not [${this.clause}])`;
  }
}

NotEq.create = (name, value, where) => {
  if (typeof name === 'object') {
    var key = Object.keys(name)[0];
    var obj = name[key];
    var ninKey = Object.keys(obj)[0]; // $nin
    value = obj[ninKey];
    name = key;
    where = value;
  }
  return new NotEq(name, value, where);
};
