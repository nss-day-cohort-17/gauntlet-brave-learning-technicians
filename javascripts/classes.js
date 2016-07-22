"use strict";

var Gauntlet = function ($$gauntlet) {

  $$gauntlet.GuildHall = function () {
    let _professions = new Map();

    return {
      classes () {
        return _professions;
      },
      load (callBack) {
        return new Promise((resolve, reject) => {
          $.ajax({url: "./data/classes.json"}).done(response => {

            // Iterate over all the class objects in the JSON file
            response.classes.each(currentClass => {

              // Define the prototype for the new profession
              let prototypeForObject = (currentClass.prototype === null) ? {} : _professions.get(currentClass.prototype);

              // Create the new profession
              let profession = Object.assign(Object.create(prototypeForObject), currentClass);

              // Add a toString() method to each class which displays the label
              __.property(profession, "toString", () => currentClass.label);

              // Add new profession to the Map
              _professions.set(currentClass.id, profession);
            });

            // Resolve the promise
            resolve(_professions);

          }).fail((xhr, error, msg) => {
            console.error(msg);
          });
        });
      }
    }
  }();

  return $$gauntlet;

}(Gauntlet || {});

