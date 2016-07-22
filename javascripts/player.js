"use strict";

var Gauntlet = function ($$gauntlet) {
  let _army = {};

  /*
    Define the base object for any player of Gauntlet,
    whether a human player or a monster.
   */
  let _player = _army.Player = Object.create(null);

  __.property(_player, "species", null);
  __.property(_player, "profession", null);
  __.property(_player, "weapon", null);
  __.property(_player, "playerName", null);
  __.property(_player, "protection", 0);
  __.property(_player, "health", 0);
  __.property(_player, "strength", 90);
  __.property(_player, "intelligence", 90);
  __.property(_player, "effects", []);
  __.property(_player, "limbs", ["head", "neck", "arm", "leg", "torso"]);
  __.property(_player, "skinColor", "");
  __.property(_player, "skinColors", ["gray"]);

  __.def(_player, "toString", function() {
    let output = [this.playerName,
      ": a ",
      this.skinColor,
      (this.skinColor) ? " skinned " : "",
      this.species,
      " ",
      this.profession,
      " with ",
      this.health,
      ` health, ${this.strength} strength, and ${this.intelligence} intelligence`,
      (this.profession.magical) ? ". I smell a mage" : ` is wielding a ${this.weapon}.`
    ].join("");
    return output;
  });


  __.def(_player, "equip", function (profession, weapon) {
    this.health = Math.floor(Math.random() * 200 + 150);

    // Compose a profession
    if (!profession) {
      this.generateClass();
    } else {
      this.setClass(profession);
    }

    // Use the stat modifiers for the species
    if ("healthModifier" in this) {
      this.modifyHealth(this.healthModifier)
          .modifyStrength(this.strengthModifier)
          .modifyIntelligence(this.intelligenceModifier);
    }

    // Compose a weapon
    if (!this.profession.magical) {
      if (!weapon) {
        this.generateWeapon();
      } else {
        this.setWeapon(weapon);
      }
    }

    this.setSkin();

    return this;
  });

  __.def(_player, "modifyHealth", function(bonus) {
    this.health += bonus;
    if (this.health < 20) this.health = 20;
    return this;
  });

  __.def(_player, "modifyStrength", function(bonus) {
    this.strength += bonus;
    if (this.strength < 10) this.strength = 10;
    return this;
  });

  __.def(_player, "modifyIntelligence", function(bonus) {
    this.intelligence += bonus;
    if (this.intelligence < 10) this.intelligence = 10;
    return this;
  });

  __.def(_player, "generateClass", function () {
    // Composes the corresponding _player class into the _player object
    this.setClass($$gauntlet.GuildHall.classes().get(this.allowedClasses.random()));
  });

  __.def(_player, "setClass", function(newClass) {
    this.profession = newClass;

    this.modifyHealth(newClass.healthModifier)
        .modifyStrength(newClass.strengthModifier)
        .modifyIntelligence(newClass.intelligenceModifier);

    return this;
  });

  __.def(_player, "generateWeapon", function() {
    try {
      if (this.profession && !this.profession.magical) {
        this.setWeapon($$gauntlet.WeaponRack.weapons().random());
      }
    } catch (ex) {
      console.log("this.profession.allowedWeapons", this.profession.allowedWeapons);
    }

    return this;
  });

  __.def(_player, "setWeapon", function(newWeapon) {
    this.weapon = newWeapon;
    return this;
  });

  __.def(_player, "setSkin", function() {
    this.skinColor = this.skinColors.random();
    return this;
  });


  /*
    Define the base properties for a human in a
    constructor function.
   */
  _army.Human = Object.create(_player);

  __.def(_army.Human, "init", function (name) {
    this.species = "Human";
    this.playerName = name;
    this.intelligence = this.intelligence + 20;
    this.skinColors.push("brown", "red", "white", "disease");

    this.allowedClasses = ["Warrior", "Berserker", "Valkyrie", "Monk"];
    this.allowedClasses.push("Wizard", "Conjurer", "Sorcerer");
    this.allowedClasses.push("Thief", "Ninja");

    return this;
  });

  // Attach the army to the global gauntlet object
  $$gauntlet.Army = _army;

  return $$gauntlet;

}(Gauntlet || {});
