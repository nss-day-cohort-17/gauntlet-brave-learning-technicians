"use strict";

// Create object to which utility functions are added for use in the project
const __ = (__ => {
  __.compose = function (target, ...args) {
    args.each(arg => target = Object.assign(target, arg));
    return target;
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

  __.getURLParameter = name => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  };

  return __;
})({});

// CAUTION: Extend native prototypes only if you understand the consequences
(() => {
  if (!("each" in Array.prototype)) {
    Array.prototype.each = new Proxy(Array.prototype.forEach, {
      apply: function (_target, _this, _args) {
        return _target.apply(_this, _args);
      }
    });
  }

  if (!("random" in Array.prototype)) {
    Array.prototype.random = function () {
      return this[Math.floor(Math.random() * this.length)];
    };
  }

  if (!("random" in Set.prototype)) {
    Set.prototype.random = function () {
      return [...this].random();
    };
  }
})();