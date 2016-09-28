"use strict";

var Gauntlet = function ($$gauntlet) {
  let army = {};

  /*
    Define the base object for any player of Gauntlet,
    whether a human player or a monster.
   */
  let player = army.Player = Object.create(null);

  __.property(player, "species", null);
  __.property(player, "profession", null);
  __.property(player, "weapon", null);
  __.property(player, "name", null);
  __.property(player, "protection", 0);
  __.property(player, "health", 0);
  __.property(player, "strength", 90);
  __.property(player, "intelligence", 90);
  __.property(player, "effects", []);
  __.property(player, "limbs", ["head", "neck", "arm", "leg", "torso"]);
  __.property(player, "skinColor", "");
  __.property(player, "skinColors", ["gray"]);

  __.def(player, "toString", function() {
    let output = [this.name,
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


  __.def(player, "equip", function (profession, weapon) {
    this.health = Math.floor(Math.random() * 200 + 150);

    // Compose a profession
    if (!profession) {
      this.setProfession();
    } else {
      this.setProfession(profession);
    }

    // Use the stat modifiers for the species
    if ("healthModifier" in this) {
      this.modifyHealth(this.healthModifier)
          .modifyStrength(this.strengthModifier)
          .modifyIntelligence(this.intelligenceModifier);
    }

    // Compose a weapon
    if (!this.profession.magical) {
      this.setWeapon(weapon);
    }

    this.setSkin();

    return this;
  });

  __.def(player, "modifyHealth", function(bonus) {
    this.health += bonus;
    if (this.health < 20) this.health = 20;
    return this;
  });

  __.def(player, "modifyStrength", function(bonus) {
    this.strength += bonus;
    if (this.strength < 10) this.strength = 10;
    return this;
  });

  __.def(player, "modifyIntelligence", function(bonus) {
    this.intelligence += bonus;
    if (this.intelligence < 10) this.intelligence = 10;
    return this;
  });

  __.def(player, "setProfession", function(profession) {

    if (!profession) {
      this.profession = $$gauntlet.GuildHall.classes().get(this.allowedClasses.random());
    } else {
      this.profession = profession;
    }

    try {
      this.modifyHealth(this.profession.healthModifier)
          .modifyStrength(this.profession.strengthModifier)
          .modifyIntelligence(this.profession.intelligenceModifier);
    } catch (ex) {
      console.error(ex, profession);
    }

    return this;
  });

  __.def(player, "setWeapon", function(newWeapon) {
    try {
      if (this.profession && !this.profession.magical && !newWeapon) {
        this.weapon = $$gauntlet.WeaponRack.weapons().random();
      } else if (newWeapon) {
        this.weapon = newWeapon;
      }
    } catch (ex) {
      console.log("this.profession.allowedWeapons", this.profession.allowedWeapons);
    }

    return this;
  });

  __.def(player, "setSkin", function() {
    this.skinColor = this.skinColors.random();
    return this;
  });


  /*
    Define the base properties for a human in a
    constructor function.
   */
  army.Human = Object.create(player);

  __.def(army.Human, "init", function (name) {
    this.species = "Human";
    this.name = name;
    this.intelligence = this.intelligence + 20;
    this.skinColors.push("brown", "red", "white", "disease");

    this.allowedClasses = ["Warrior", "Berserker", "Valkyrie", "Monk"];
    this.allowedClasses.push("Wizard", "Conjurer", "Sorcerer");
    this.allowedClasses.push("Thief", "Ninja");

    return this;
  });

  // Attach the army to the global gauntlet object
  $$gauntlet.Army = army;

  return $$gauntlet;

}(Gauntlet || {});
