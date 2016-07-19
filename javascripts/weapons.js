"use strict";

var Gauntlet = function (g) {

  // Base Weapon object
  let Weapon = Object.create(null);

  /*
    No prototype chain set up in the JSON file. Each subsequent weapon
    will directly inherit from Weapon, so set its prototype here.
   */
  Weapon.prototype = {
    id: "nothing",
    label: "bare hands",
    base_damage: 1,
    hands: 2,
    ranged: false,
    poisoned: false
  };

  Weapon.prototype.toString = function() {
    return this.label;
  };

  // WeaponRack will hold all defined weapons
  g.WeaponRack = function () {
    let weaponList = {};

    return {

      // Method to return the entire collection of weapons
      weapons () {
        return weaponList;
      },

      // Method to load the weapons from the JSON file
      load () {
        return new Promise((resolve, reject) => {
          $.ajax({url: "./data/weapons.json"}).done((response) => {
            response.weapons.each((weapon) => {
              let currentWeapon;

              weaponList[weapon.id] = Object.create(Weapon.prototype);
              currentWeapon = weaponList[weapon.id];

              Object.keys(weapon).each((p) => {
                __.property(currentWeapon, p, weapon[p]);
              });
            });
            resolve(weaponList);
          }).fail((xhr, error, msg) => {
            reject(msg);
          });
        });

      }
    }
  }();

  return g;

}(Gauntlet || {});
