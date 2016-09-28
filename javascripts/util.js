"use strict";

const help = (topic) => {
  if (!topic) {
    console.log("help('weapons' || 'w') -- Show all available weapons.");
    console.log("help('monsters' || 'm') -- Show all available monsters.");
    console.log("help('spells' || 's') -- Show all available spells.");
  } else {

    let output = "";

    switch(topic) {
      case "weapons":
      case "w":
        console.clear();
        output += `Weapon              Base Dmg     Poison    Ranged\n====================================================\n`;
        Gauntlet.WeaponRack.weapons().each(w => output += `${(w.label + " ".repeat(20)).slice(0, 20)}${(w.base_damage + " ".repeat(13)).slice(0,13)}${(w.poisoned + " ".repeat(6)).slice(0,10)}${w.ranged}\n`);
        break;


      case "spells":
      case "s":
        console.clear();
        output += `Spell              Range        Effect         Defensive\n=========================================================\n`;
        Gauntlet.Spellbook.spells().each(w => output += `${(w.id + " ".repeat(20)).slice(0, 19)}${((w.base_effect + " - " + (w.base_effect + w.effect_modifier)) + " ".repeat(13)).slice(0,13)}${(w.affected_trait + " ".repeat(15)).slice(0,15)}${w.defensive}\n`);
        break;


      case "monsters":
      case "m":
        console.clear();
        output += `Species        Mods: Health   Strength   Intelligence\n=====================================================\n`;
        Gauntlet.Horde.all().each(w => output += `${(w.species + " ".repeat(22)).slice(0, 21)}${(w.healthModifier + " ".repeat(10)).slice(0, 9)}${(w.strengthModifier + " ".repeat(12)).slice(0, 11)}${(w.intelligenceModifier + " ".repeat(12)).slice(0, 11)}\n`)
        break;
    }
    console.log(output);
  }
};

// Create object to which utility functions are added for use in the project
const __ = (__ => {
  __.compose = (proto, ...args) => {
    let target = Object.create(proto)
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

  if (!("random" in Map.prototype)) {
    Map.prototype.random = function () {
      return [...this.values()].random();
    };
  }

  if (!("random" in Set.prototype)) {
    Set.prototype.random = function () {
      return [...this].random();
    };
  }
})();
