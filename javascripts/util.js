"use strict";

const help = (topic) => {
  if (!topic) {
    console.log("help('weapons' || 'w') -- Show all available weapons.");
    console.log("help('monsters' || 'm') -- Show all available monsters.");
    console.log("help('spells' || 's') -- Show all available spells.");
  } else {
    switch(topic)
    {
      case "weapons":
      case "w":
        console.log(`
Weapon              Base Dmg     Poison    Ranged
====================================================
`);
        Gauntlet.WeaponRack.weapons().each(w => console.log(`${(w.label + " ".repeat(20)).slice(0, 20)}${(w.base_damage + " ".repeat(13)).slice(0,13)}${(w.poisoned + " ".repeat(6)).slice(0,10)}${w.ranged} `))
        break;
      case "spells":
      case "s":
        Gauntlet.Spellbook.spells().each(w => console.log(w))
        break;
      case "monsters":
      case "m":
        Gauntlet.Horde.all().each(w => console.log(w))
        break;
    }
  }
};

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

  if (!("each" in Map.prototype)) {
    Map.prototype.each = new Proxy(Map.prototype.forEach, {
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
