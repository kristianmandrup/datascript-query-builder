import Query from './query';
import Pull from './pull';
import Entity from './entity';
import Datoms from './datoms';

export default class QueryBuilder {
  constructor(entityClass, options) {
    this.entityClass = entityClass;
    this.defaultOptions = options || this._defaultOpts;
  }

  get _defaultOpts() {
    return {
      mode: 'inline',
      // default function to prefix with entity name
      // ie. ':person/name' instead of simply 'name'
      mapNames: (name) => {
        return `${this.entityClass}/${name}`;
      }
    };
  }

  datoms(params) {
    return new Datoms(this.entityClass, params).build();
  }

  entities(params) {
    return new Entity(this.entityClass, params).build();
  }

  byId(params) {
    return new Pull(this.entityClass, params).build();
  }

  query(params, options) {
    return new Query(this.entityClass, params, options || this.defaultOptions).build();
  }
}
