import { toTupleObjList } from '../util';
import _ from 'lodash';

function specialAttrib(name) {
  return stringify(name).match(/\$/g);
}

function stringify(val) {
  return (typeof val === 'object') ? Object.keys(val)[0] : val;
}

export default class In {
  // 'name', 'age'
  // {name: 'alice'}
  // in - {name: {$in: ['alice', 'wonder']}}
  // not in - {name: {$nin: ['alice', 'wonder']}}

  // TODO: exclude attribute names if mode: inline
  constructor(params, options) {
    this.options = options || {};
    if (!Array.isArray(params)) {
      params = toTupleObjList(params);
    } else {
      params = this._filtered(params);
    }
    this.params = params;
  }

  _filtered(attrs) {
    return attrs.reduce((prev, next) => {
      var attr = stringify(next);
      return specialAttrib(attr) ? prev : prev.concat([next]);
    }, []);
  }

  build() {
    if (!this.params || this.params.length === 0) {
      return {};
    }
    // TODO: depends on mode in options
    return `${this._params}`;
  }

  get _params() {
    return (this.options.mode === 'inline') ? this._paramValues : this._all;
  }

  // TODO: depends on mode in options
  get _paramValues() {
    return this.params.map(param => {
      return this._value(param);
    }).join(' ');
  }

  get _all() {
    var params = this.params.map(param => {
      var val = [`${this._paramName(param)}`, this._value(param)].join(' ');
      return val;
    }).join(' ');
    return _.trim(params);
  }

  _paramName(param) {
    var key = (typeof param === 'object') ? Object.keys(param)[0] : param;
    return specialAttrib(key) ? '' : `?${key}`;
  }

  _value(param) {
    return (typeof param === 'object') ? this._objValue(param) : `${this._format(param)}`;
  }

  _format(name) {
    return specialAttrib(name) ? '' : `?${name}-value`;
  }

  // ie. {name: {$in: ['alice', 'wonder']}}
  _objValue(param) {
    var key = Object.keys(param)[0];
    var value = param[key];
    // get value
    if (value.$in || value.$nin) {
      return `[${this._format(key)} ...]`;
    }
    return `${this._format(key)}`;
  }
}
