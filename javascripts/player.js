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
      this.modifyHealth(this.healthModifier);
      this.modifyStrength(this.strengthModifier);
      this.modifyIntelligence(this.intelligenceModifier);
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

  });

  __.def(_player, "modifyHealth", function(bonus) {
    this.health += bonus;
    if (this.health < 20) this.health = 20;
  });

  __.def(_player, "modifyStrength", function(bonus) {
    this.strength += bonus;
    if (this.strength < 10) this.strength = 10;
  });

  __.def(_player, "modifyIntelligence", function(bonus) {
    this.intelligence += bonus;
    if (this.intelligence < 10) this.intelligence = 10;
  });

  __.def(_player, "generateClass", function () {
    // Get a random index from the allowed classes array
    let random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    let randomClassName = this.allowedClasses[random];
    let randomClass = $$gauntlet.GuildHall.classes().get(randomClassName);

    // Composes the corresponding _player class into the _player object
    this.setClass(randomClass);
  });

  __.def(_player, "setClass", function(newClass) {
    this.profession = newClass;

    this.modifyHealth(newClass.healthModifier);
    this.modifyStrength(newClass.strengthModifier);
    this.modifyIntelligence(newClass.intelligenceModifier);
  });

  __.def(_player, "generateWeapon", function() {
    try {
      if (this.profession && !this.profession.magical) {
        let random = Math.round(Math.random() * (this.profession.allowedWeapons.length - 1));
        let weapon = this.profession.allowedWeapons[random];
        this.setWeapon($$gauntlet.WeaponRack.weapons()[weapon]);
      }
    } catch (ex) {
      console.log("this.profession.allowedWeapons", this.profession.allowedWeapons);
    }
  });

  __.def(_player, "setWeapon", function(newWeapon) {
    this.weapon = newWeapon;
  });

  __.def(_player, "setSkin", function() {
    let randomSkin = Math.round(Math.random() * (this.skinColors.length-1));
    this.skinColor = this.skinColors[randomSkin];
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


  $$gauntlet.Army = _army;

  return $$gauntlet;

}(Gauntlet || {});
