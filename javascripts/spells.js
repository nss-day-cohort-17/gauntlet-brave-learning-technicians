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
      let totalEffect = Math.round(this.effect + (this.intelligenceModifier || 0));
      totalEffect *= (this.augment) ? 1 : -1;
      target[this.affected_trait] += totalEffect;

      return {
        spell: this.label,
        element: this.elements.random(),
        target: this.target.name,
        effect: this.affected_trait,
        damage: totalEffect
      };
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
                spellList.push(__.compose(Object.create(MasterSpell), currentSpell))
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
