const { createHash } = require('crypto');

const maxBlobs = 1000;

class InMemoryBlobStore {
  constructor() {
    this._storage = {};
    this._keys = [];
  }

  add(blob) {
    const digest = createHash('sha256').update(blob).digest('hex').substr(0, 16);
    this._storage[digest] = blob;
    this._keys.push(digest);
    if (this._keys.length > maxBlobs) {
      const evicted = this._keys.shift();
      delete this._storage[evicted];
    }
    return Promise.resolve(digest);
  }

  fetch(key) {
    return Promise.resolve(this._storage[key]);
  }
}

module.exports.InMemoryBlobStore = InMemoryBlobStore