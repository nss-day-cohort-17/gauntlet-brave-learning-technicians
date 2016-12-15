/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
warrior.setWeapon(new WarAxe());
warrior.generateClass();  // This will be used for "Surprise me" option
console.log(warrior.toString());

// var orc = new Gauntlet.Combatants.Orc();
// orc.generateClass();
// orc.setWeapon(new BroadSword());
// console.log(orc.toString());

/*
  Test code to generate a spell
 */
var spell = new Gauntlet.SpellBook.Sphere();
console.log("spell: ", spell.toString());

// assign name from text field to warrior
$(document).ready(function() {
$(".getMeName").click( function setName () {
  warrior.playerName = $('#player-name').val();
  console.log(warrior.toString());
})

  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();
  /*
    When any button with card__link class is clicked,
    move on to the next view.
   */
  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--class":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--weapon":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
        break;
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });

  /*
    When the back button clicked, move back a view
   */
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });





 // $(this).data('class');

$("#class-select .youAreHere").click( function(e){
  // debugger
  var selectedClass = $(e.target).attr("data-class");
  console.log(selectedClass)
  var finalClass = new Gauntlet.GuildHall[selectedClass]()

  console.log(finalClass)
  console.log(Gauntlet.Combatants)
  Gauntlet.Combatants.Human.prototype.class = finalClass;
  console.log(Gauntlet.Combatants)
})

$("#weapon-select .youAreHere").click( function(){
  var selectedWeapon = $(this).attr("data-class");
  console.log(selectedWeapon)
  var finalWeapon = new window[selectedWeapon]()

  console.log(finalWeapon)
  console.log(Gauntlet.Combatants)
  Gauntlet.Combatants.Human.prototype.weapon = finalWeapon;
  console.log(Gauntlet.Combatants)
})

// Attack button function
$("#attackButton").click( function() {
  console.log("Initial Player Health: " , Gauntlet.Combatants.Human.prototype.health)
  console.log("Initial Enemy Health: ", Gauntlet.Combatants.Orc.prototype.__proto__.health)

})




var orc = new Gauntlet.Combatants.Orc();
var oClass = orc.generateClass();
Gauntlet.Combatants.Orc.prototype.__proto__.class = oClass;

Gauntlet.Combatants.Orc.prototype.__proto__.weapon = new BroadSword();
console.log(Gauntlet.Combatants);



// function damage(e){
//   var randomHurt = Math.round(Math.random()+1);
//   var hurtRng = (Math.round(((this.strength + (this.class.strengthBonus/2))/4)) + (this.weapon.damage/randomHurt)
//   return hurtRng;
// };
//
//
// var humanAD = damage(Gauntlet.Combatants.Human.prototype)
//
// var orcAD = damage(Gauntlet.Combatants.Orc.prototype.__proto__)
//
var humanHealthTotal = Gauntlet.Combatants.Human.prototype.health + Gauntlet.Combatants.Human.prototype.class.healthBonus
//
// var orcHelathTotal = Gauntlet.Combatants.Orc.prototype.__proto__.health + Gauntlet.Combatants.Orc.prototype.__proto__.class.healthBonus
//




// if(humanHealthTotal !<= 0 && orcHelathTotal !<= 0){
//   humanHealthTotal = humanHealthTotal - orcAD;
//   orcHelathTotal = orcHelathTotal - humanAD;
//
//
//
// }else if(humanHealthTotal <=0){
//   //YOU DIED
// }else if(orcHelathTotal <= 0){
//   //YOU WIN
// };







});
