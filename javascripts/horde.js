"use strict";

var Gauntlet = function ($$gauntlet) {

  $$gauntlet.Horde = function () {
    let horde = new Map();
    let names = new Set();

    return {
      soldier (type) {
        let soldier = Object.create(horde.get(type));
        return soldier;
      },
      random () {
        let randomSoldier = [...horde].random()[1];
        randomSoldier.name = names.random();
        return randomSoldier;
      },
      load () {
        return new Promise((resolve, reject) => {
          $.ajax({url: "./data/horde.json"}).done(response => {

            response.names.each(name => {
              names.add(name);
            });


            response.classes.each(monster => {
              let objectPrototype;

              // The base monster will always have Player as its prototype
              if (monster.prototype === null) {
                objectPrototype = $$gauntlet.Army.Player;
              } else  {
                objectPrototype = horde.get(monster.prototype);
              };

              // Create a new object for the current monster based on corresponding prototype
              let monsterForMap = __.compose(Object.create(objectPrototype), monster, {
                species: monster["id"]
              });

              // Add creature to the horde Map
              horde.set(monster.id, monsterForMap);
            });

            // Resolve the promise
            resolve();

          }).fail((xhr, error, msg) => {
            console.error(msg);
            reject();
          });
        });
      }
    }
  }();

  return $$gauntlet;

}(Gauntlet || {});
