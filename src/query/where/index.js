import { toTupleList } from '../../util';
import Builder from './builder';

function specialAttrib(name) {
  return name.match(/\$/g);
}

export default class Where {
  constructor(params, options) {
    this.options = options;
    if (typeof params === 'object') {
      params = toTupleList(params);
    }
    this.params = params;
    this.values = [];
    this.names = new Set();
  }

  setValue(param) {
    if (Array.isArray(param)) {
      this.values.push(param);
      return;
    }
    // ignore Object values
    switch (typeof param) {
      case 'object':
        return;
      case 'undefined':
        return;
      default:
        this.values.push(param);
    }
  }

  setName(name) {
    // ignore non string values
    if (typeof name !== 'string') {
      return;
    }
    if (!specialAttrib(name)) {
      this.names.add(name);
    }
  }

  build() {
    return this.params.map(param => {
      var builder = Builder.create(...param);
      builder.options = this.options;
      return builder.build(this);
    });
  }
}
