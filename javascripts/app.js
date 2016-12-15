/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
// warrior.setWeapon(new WarAxe());
// warrior.generateClass();  // This will be used for "Surprise me" option
// console.log(warrior.toString());

var orc = new Gauntlet.Combatants.Orc();
orc.generateClass();
orc.setWeapon(new BroadSword());
console.log(orc.toString());

/*
  Test code to generate a spell
 */
var spell = new Gauntlet.SpellBook.Sphere();
console.log("spell: ", spell.toString());

// assign name from text field to warrior
$(document).ready(function() {


$(".getMeName").click( function setName () {
  warrior.playerName = $('#player-name').val();
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
//get name form input

  // debugger
  // var playerName = $("#player-name").val()
  // console.log(playerName)




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
  console.log("Initial Player Health: " , warrior.health)
  console.log("Initial Enemy Health: ", orc.health)

})


var orc = new Gauntlet.Combatants.Orc();
var oClass = orc.generateClass();
orc.class = oClass;

// var oHurt = orc.setWeapon(new BroadSword());
orc.weapon = new BroadSword();
console.log(Gauntlet.Combatants);
// got the intial stats of player and Enemy
$(".getEnemy").click(function (){
  $("#playerCard").html(`<h3>Player : ${warrior.playerName} </h3> <h5>Health : ${warrior.health}</h5>
                        <h5>Character : ${warrior.class.name}</h5><h5>Weapon : ${warrior.weapon.name}</h5>`)
  $("#enemyCard").html(`<h3>Enemy :${orc.class} <h3> <h5>Health : ${orc.health}
                      <h5>Weapon : ${orc.weapon.name}</h5>`)

});
//
//
// var orc = new Gauntlet.Combatants.Orc();
// orc.generateClass();
// orc.setWeapon(new BroadSword());
// console.log(Gauntlet.Combatants);
//
//


});
