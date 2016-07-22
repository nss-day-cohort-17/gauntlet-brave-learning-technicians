"use strict";

var Gauntlet = function ($$gauntlet) {

  // Base Weapon object
  const MasterSpell = {
    name: "",
    base_damage: 0,
    effect: 0,
    target: null,
    elements: ["lightning", "fire", "water", "earth", "mysticism"],
    toString () {
      return `${ this.label } of ${ this.elements.random() }`;
    },
    read (modifier) {
      this.intelligenceModifier = modifier;
      return this;
    },
    cast () {
      this.effect = Math.round(Math.random() * this.base_effect + this.effect_modifier);
      return this;
    },
    at (target) {
      this.target = target;
      // TODO: Add critical chance
      target[this.affected_trait] += (this.effect * ((this.augment) ? 1 : -1)) + (this.intelligenceModifier || 0);
      return `${this.label} of ${this.elements.random()} modified
              ${this.target.name}'s ${this.affected_trait} by ${this.effect}`;
    }
  };

  // Spellbook will hold all defined weapons
  $$gauntlet.Spellbook = function () {
    let spellList = [];

    return {

      // Method to return the entire collection of spells
      spells () {
        return spellList;
      },

      // Method to load the spells from the JSON file
      load () {
        return new Promise((resolve, reject) => {
          $.ajax({url: "./data/spells.json"}).done(response => {

            // Iterate all weapon objects in the JSON file
            response.spells.each(currentSpell =>
                spellList.push(Object.assign(Object.create(MasterSpell), currentSpell))
            );

            // Resolve the weapon loading promise with the weapon list
            resolve(spellList);

          }).fail((xhr, error, msg) => {
            reject(msg);
          });
        });
      }
    }
  }();

  return $$gauntlet;

}(Gauntlet || {});
