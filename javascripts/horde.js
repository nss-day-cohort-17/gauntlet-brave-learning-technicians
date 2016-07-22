"use strict";

var Gauntlet = function ($$gauntlet) {

  $$gauntlet.Horde = function () {
    let _horde = new Map();

    return {
      soldier (type) {
        let soldier = Object.create(_horde.get(type));
        return soldier;
      },
      random () {
        let enemies = [];
        for (let key of _horde.keys()) {
          // Monster is the base class. Don't want to create instances of it.
          if (key !== "Monster") {
            enemies.push(key);
          }
        }
        let randomPosition = Math.round(Math.random() * (enemies.length - 1));
        let randomSoldier = _horde.get(enemies[randomPosition]);
        let returnObject = Object.create(randomSoldier);
        return returnObject;
      },
      load () {
        return new Promise((resolve, reject) => {
          $.ajax({url: "./data/horde.json"}).done(response => {
            response.classes.each(monster => {
              let objectPrototype;

              // The base monster will always have Player as its prototype
              if (monster.prototype === null) {
                objectPrototype = $$gauntlet.Army.Player;
              } else  {
                objectPrototype = _horde.get(monster.prototype);
              };

              // Create a new object for the current monster based on corresponding prototype
              let monsterForMap = Object.assign(Object.create(objectPrototype), monster);

              // Add on a new species property, pulled from the object's id property
              __.property(monsterForMap, "species", monster["id"]);

              // Add new monster to the _horde Map
              _horde.set(monster.id, monsterForMap);
            });

            // Resolve the promise
            resolve(_horde);

          }).fail((xhr, error, msg) => {
            console.error(msg);
          });
        });
      }
    }
  }();

  return $$gauntlet;

}(Gauntlet || {});
