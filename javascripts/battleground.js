"use strict";

const Battleground = function (humanCombatant, enemyCombatant, consoleOutput = false) {
  this.human = humanCombatant;
  this.enemy = enemyCombatant;
  this.consoleOutput = consoleOutput;
};

Battleground.prototype.melee = function() {
  let formattedResult = "";

  // Perform attack and return the string outcome
  const attack = (combatant, target) => {
    let result, spell, modifier;

    if (combatant.profession.magical) {
      spell = Gauntlet.Spellbook.spells().random();
      modifier = Math.floor(combatant.intelligence / 15);
      result = spell.read(modifier).cast().at((spell.defensive) ? combatant : target);
      result = `
        ${combatant.name} cast ${result.spell} of ${result.element}
        on ${(spell.defensive) ? combatant.name : target.name} for ${result.damage} ${result.effect}
      `;
    } else {
      modifier = Math.floor(combatant.strength / 3);
      result = combatant.weapon.swing(modifier).at(target);
      result = ` ${combatant.name} attacked ${target.name} for ${result.damage}`;
    }

    return result;
  }

  /*
    Perform player action
   */
  const playerOutcome = attack(this.human, this.enemy);

  if (this.consoleOutput) {
    console.clear();
    console.log(`${this.human.name} the ${this.human.profession.label} (${this.human.strength} str) (${this.human.intelligence} int) (${this.human.protection} armor) wielding a ${(this.human.weapon) ? this.human.weapon : "Spellbook"}`);
    console.info(`${this.human.health} hp`);
    console.log(`${this.enemy.name} the ${this.enemy.id} ${this.enemy.profession.label} (${this.enemy.strength} str) (${this.enemy.intelligence} int) (${this.enemy.protection} armor) wielding a ${(this.enemy.weapon) ? this.enemy.weapon : "Spellbook"}`);
    console.info(`${this.enemy.health} hp`);
    console.log(`${playerOutcome}`);

    if (this.enemy.health <= 0) {
      console.log(`${this.human.name} won!!`);
      return false;
    }
  } else {
    $("#battle-record").append(`<div class="battle-record__human">${playerOutcome}</div>`);
    if (this.enemy.health <= 0) {
      $("#battle-record").append("<div class=\"battle-over\">The battle is over. You won!</div>");
      return false;
    }
  }

  /*
    Perform enemy action
   */
  const enemyOutcome = attack(this.enemy, this.human);

  if (this.consoleOutput) {
    console.log(`${enemyOutcome}`);
    if (this.human.health <= 0) {
      console.log(`${this.enemy.name} won!!`);
      return false;
    }
  } else {
    $("#battle-record").append(`<div class="battle-record__enemy">${enemyOutcome}</div>`);
    if (this.human.health <= 0) {
      $("#battle-record").append("<div class=\"battle-over\">The battle is over. The " + this.enemy.name + " won!</div>");
      return false;
    }
  }

  return true;
};
