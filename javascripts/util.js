"use strict";

(() => {
  Array.prototype.each = new Proxy(Array.prototype.forEach, {
    apply: function (_target, _this, _args) {
      return _target.apply(_this, _args);
    }
  });

  Array.prototype.random = function () {
    return this[Math.round(Math.random() * (this.length - 1))];
  }
})();

const __ = (__ => {
  __.compose = function (target, ...args) {
    args.each(arg => target = Object.assign(target, arg));
  };

  __.property = new Proxy(Object.defineProperty, {
    apply: function (_target, _this, _args) {
      return _target(_args[0], _args[1], {
        value: _args[2],
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  });

  __.def = new Proxy(Object.defineProperty, {
    apply: function (_target, _this, _args) {
      return _target(_args[0], _args[1], {
        value: _args[2],
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  });

  return __;
})({});
