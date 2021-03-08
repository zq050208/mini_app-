function toArray(list: any[], startIndex = 0) {
  return Array.prototype.slice.call(list, startIndex);
}

export class Events {
  private _events: IAnyObject;
  constructor() {
    this._events = {};
  }
  on(event: string, fn: Function) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.on(event[i], fn);
      }
    } else {
      (this._events[event] || (this._events[event] = [])).push(fn);
    }
    return this;
  }
  once(event: string, fn: Function) {
    const on = (...args: any[]) => {
      this.off(event, on);
      fn(...args);
    };
    on.fn = fn;
    this.on(event, on);
    return this;
  }
  off(event: string, fn: Function) {
    // all
    if (!arguments.length) {
      this._events = Object.create(null);
      return this;
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.off(event[i], fn);
      }
      return this;
    }

    // specific event
    const cbs = this._events[event];
    if (!cbs) {
      return this;
    }
    if (!fn) {
      this._events[event] = null;
      return this;
    }
    // specific handler
    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }
  emit(event: string, ...args: any[]) {
    let cbs = this._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i](...args);
        } catch (error) {
          console.error(error);
        }
      }
    }
    return this;
  }
}

export default new Events();
