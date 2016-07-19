"use strict";

(() => {
  Array.prototype.each = new Proxy(Array.prototype.forEach, {
    apply: function (_target, _this, _args) {
      return _target.apply(_this, _args);
    }
  });
})();

const __ = (__ => {
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
