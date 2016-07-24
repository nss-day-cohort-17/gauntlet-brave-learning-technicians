"use strict";

var Gauntlet = function ($$gauntlet) {

  $$gauntlet.GuildHall = function () {
    let allProfessions = new Map();

    return {
      classes () {
        return allProfessions;
      },
      load (callBack) {
        return new Promise((resolve, reject) => {
          $.ajax({url: "./data/classes.json"}).done(response => {

            // Iterate over all the class objects in the JSON file
            response.classes.each(currentClass => {

              // Define the prototype for the new profession
              let prototypeForObject = currentClass.prototype === null
                                          ? {}
                                          : allProfessions.get(currentClass.prototype);

              // Create the new profession
              let profession = __.compose(Object.create(prototypeForObject), currentClass);

              // Add a toString() method to each class which displays the label
              __.def(profession, "toString", () => currentClass.label);

              // Add new profession to the Map
              allProfessions.set(currentClass.id, profession);
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

