export class LocalStoragePolyfill {
  private data: {id?: string} = {};

  constructor() {
    this.data = {};
  }

  setItem(id, val: string) {
    return (this.data[id] = String(val));
  }

  getItem(id) {
    return this.data.id ? this.data[id] : null;
  }

  removeItem(id) {
    delete this.data[id];
  }

  clear() {
    return (this.data = {});
  }
}
