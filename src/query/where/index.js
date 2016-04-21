import { toTupleList } from '../../util';
import Builder from './builder';

export default class Where {
  constructor(params, options) {
    this.options = options || {};
    this.options.specialKey = this.options.specialKey || /^(\$|\.)/g;

    if (typeof params === 'object') {
      params = toTupleList(params);
    }
    this.params = params;
    this.values = [];
    this.names = new Set();
  }

  get specialKey() {
    return this.options.specialKey;
  }

  specialAttrib(name) {
    if (this.options.specialAttrib) {
      return this.options.specialAttrib(name);
    }
    return name.match(this.specialKey);
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
    if (!this.specialAttrib(name)) {
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
