let Battleground = function (humanCombatant, enemyCombatant) {
  this.human = humanCombatant;
  this.enemy = enemyCombatant;
};

Battleground.prototype.melee = function() {
  let baseHumanDamage = 0,
      baseEnemyDamage = 0,
      totalHumanDamage = 0,
      totalEnemyDamage = 0;
  let spell, result, formattedResult;

  /*
    Calculate damage done by player
   */
  if (this.human.profession.magical) {
    spell = Gauntlet.Spellbook.spells().random();
    modifier = Math.floor(this.human.intelligence / 10);
    result = spell.read(modifier).cast().at(this.enemy);
  } else {
    modifier = Math.floor(this.human.strength / 10);
    result = this.human.weapon.swing(modifier).at(this.enemy);
  }

  /*
    Start building output string for human action
   */
  formattedResult = `<div class="battle-record__human">${result}</div>`;
  $("#battle-record").append(formattedResult);

  /*
    If the human did enough damage to kill the enemy, stop the battle
   */
  if (this.enemy.health <= 0) {
    $("#battle-record").append("<div class=\"battle-over\">The battle is over. You won!</div>");

    return false;
  }

  /*
    Calculate damage done by enemy
   */
  // if (!this.enemy.profession.magical) {
  //   enemyWeapon = this.enemy.weapon;
  //   modifier = Math.floor(this.enemy.strength / 10);
  // } else {
  //   enemyWeapon = new window[AvailableSpells[Math.round(Math.random() * (AvailableSpells.length - 1))]]();
  //   enemyWeapon.cast();
  //   modifier = Math.floor(this.enemy.intelligence / 10);

  //   if (enemyWeapon.defensive) {
  //     this.enemy.protection = enemyWeapon.protection;
  //   }
  // }

  /*
    Apply damage unless a defensive spell was cast
   */
  // if (!enemyWeapon.defensive) {
  //   baseEnemyDamage = Math.round(Math.random() * enemyWeapon.base_damage + 1);
  //   totalEnemyDamage = baseEnemyDamage + modifier - this.human.protection;
  //   totalEnemyDamage = (totalEnemyDamage < 0) ? 0 : totalEnemyDamage;
  //   if (enemyCritical > 95) {
  //     totalEnemyDamage = Math.floor(totalEnemyDamage * 1.5);
  //   }
  // }

  // this.human.health -= totalEnemyDamage;

  /*
    Start building output string for enemy action
   */
  // battleResult = "<div class=\"battle-record__enemy\">";
  // if (enemyWeapon.defensive) {
  //   battleResult += "&gt; " + this.enemy.species + " <span class=\"battle-health\">(" + this.enemy.health + " hp)</span> casts a " + enemyWeapon.toString() + " for " + this.enemy.protection + " protection.";
  // } else {
  //   battleResult += "&gt; " + this.enemy.species + " <span class=\"battle-health\">(" + this.enemy.health + " hp)</span> attacks with " + enemyWeapon.toString() + " for " + totalEnemyDamage + " damage.";
  //   battleResult += (enemyCritical > 95) ? " Critical hit!!" : "";
  // }
  // battleResult += "</div>";
  // $("#battle-record").append(battleResult);

  /*
    If the enemy did enough damage to kill the human, stop the battle
   */
  if (this.human.health <= 0) {
    $("#battle-record").append("<div class=\"battle-over\">The battle is over. The " + this.enemy.species + " won!</div>");

    return false;
  }

  return true;
};