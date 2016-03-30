// Efficiently lookup all entities of a given type
// http://augustl.com/blog/2013/datomic_direct_index_lookup/

// The code to d/datoms flows as following:
// - Pass the datomic db whose indexes we want to look up.
// - Pass the index to use. We want the :avet index. (Attribute, value, entity, transaction)
// The following arguments are the components to look up in the index.
// The first entry in :avet is :a. So we pass :attendant/public-id, the attribute we want to look up.
// The second entry in :avet is :v. So we pass public-id, the value we want to look up.
//
// This will give us a raw seq of facts. Since we know that the attribute :attendant/public-id is set to unique, we can just get the (first) one.

export default class Datoms {
  constructor(entityClass, id) {
    this.entityClass = entityClass;
    this.idKey = id;
  }

  // (d/entity db
  //   (:e (first
  //     (d/datoms db :avet :attendant/public-id public-id)))
  //   )
  build() {
    return `:avet :${this.entityClass}/${this.idKey} ${this.idKey}`;
  }
}

Datoms.unpack = (index) => {
  return index[0][':e'];
};
