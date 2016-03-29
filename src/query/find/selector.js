// "$select": ["name"] only name
// $select: ['id', 'name']

// NOTE: Use remove hook to exclude attributes after result
export default class Selector {
  constructor(params) {
    this.params = params;
  }

  _normalize(param) {
    return this.params.$select ? this.params.$select : param;
  }

  get attrs() {
    if (Array.isArray(this.params)) {
      return this.params.map(param => {
        var key = Object.keys(param)[0];
        // TODO: shitty hack! $select should not be allowed here, should throw error!?
        return this._normalize(key);
      });
    }
    if (typeof this.params === 'object') {
      return this.params.$select ? this.params.$select : Object.keys(this.params);
    }
    return [];
  }

  get type() {
    return this.attrs.length > 0 ? 'only' : 'all';
  }
}
