"use strict";

var Gauntlet = function ($$gauntlet) {

  // Base Weapon object
  const Weapon = {
    id: "nothing",
    label: "bare hands",
    base_damage: 1,
    hands: 2,
    ranged: false,
    poisoned: false,
    toString () { return `fearsome ${this.label}`; }
  };

  // WeaponRack will hold all defined weapons
  $$gauntlet.WeaponRack = function () {
    let weaponList = [];

    return {

      // Method to return the entire collection of weapons
      weapons () {
        return weaponList;
      },

      // Method to load the weapons from the JSON file
      load () {
        return new Promise((resolve, reject) => {
          $.ajax({url: "./data/weapons.json"}).done(response => {

            // Iterate all weapon objects in the JSON file
            response.weapons.each(weapon =>
                weaponList.push(Object.assign(Object.create(Weapon), weapon)));

            // Resolve the weapon loading promise with the weapon list
            resolve(weaponList);

          }).fail((xhr, error, msg) => {
            reject(msg);
          });
        });
      }
    }
  }();

  return $$gauntlet;

}(Gauntlet || {});
