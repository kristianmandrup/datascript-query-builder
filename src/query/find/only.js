function specialAttrib(name) {
  return name.match(/\$/g);
}

export default class Only {
  constructor(attrs) {
    this.attrs = this._filtered(attrs);
  }

  // return tuples of attribute/value
  build() {
    return {
      ':find': this._find,
      ':in': this._in,
      ':where': this._where
    };
  }

  _filtered(attrs) {
    return attrs.reduce((prev, next) => {
      return specialAttrib(next) ? prev : prev.concat([next]);
    }, []);
  }

  get _find() {
    return this.attrs.map(name => {
      return this._attValue(name);
    });
  }

  get _in() {
    return this.attrs.map(name => {
      return this._attName(`?${name}`);
    });
  }

  _attName(name) {
    return specialAttrib(name) ? '' : `?${name}`;
  }

  _attValue(name) {
    return specialAttrib(name) ? '' : `?${name}-value`;
  }

  get _where() {
    return this.attrs.map(name => {
      return `?e ${this._attName(name)} ${this._attValue(name)}`;
    });
  }
}
