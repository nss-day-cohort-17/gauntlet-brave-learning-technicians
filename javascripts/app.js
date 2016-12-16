/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
// warrior.setWeapon(new WarAxe());
// warrior.generateClass();  // This will be used for "Surprise me" option
// console.log(warrior.toString());

// var orc = new Gauntlet.Combatants.Orc();
// orc.generateClass();
// orc.setWeapon(new BroadSword());
// console.log(orc.toString());

/*
  Test code to generate a spell
 */
// var spell = new Gauntlet.SpellBook.Sphere();
// console.log("spell: ", spell.toString());


// assign name from text field to warrior
$(".getMeName").click( function setName () {
  warrior.playerName = $('#player-name').val();
})


  // console.log(warrior.toString());

var warriorHealthTotal

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
        // debugger
        warriorHealthTotal = warrior.health + warrior.class.healthBonus;
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
        //  $('#gameOver').hide()
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
  var selectedClass = $(e.target).attr("data-class");
  console.log(selectedClass)
  var finalClass = new Gauntlet.GuildHall[selectedClass]()

  console.log(finalClass)
  // console.log(Gauntlet.Combatants)
  warrior.class = finalClass;
  console.log(Gauntlet.Combatants)
})

$("#weapon-select .youAreHere").click( function(){
  var selectedWeapon = $(this).attr("data-class");
  console.log(selectedWeapon)
  var finalWeapon = new window[selectedWeapon]()

  console.log(finalWeapon)
  // console.log(Gauntlet.Combatants)
  warrior.weapon = finalWeapon;
  console.log(Gauntlet.Combatants)
})



// Attack button function
// $("#attackButton").click( function() {
//   console.log("Initial Player Health: " , warrior.health)
//   console.log("Initial Enemy Health: ", orc.health)
//
// })



var orc = new Gauntlet.Combatants.Orc();
var oClass = orc.generateClass();
orc.class = oClass;

orc.weapon = new BroadSword();

console.log(Gauntlet.Combatants);

//setting orc total health
var orcHealthTotal = orc.health + orc.class.healthBonus

// Attack button function
$("#attackButton").click( function() {

  console.log("Initial Player Health: " , warriorHealthTotal)
  console.log("Initial Enemy Health: ", orcHealthTotal)
<<<<<<< HEAD

  if (warriorHealthTotal > 0 && orcHealthTotal > 0){
    warriorHealthTotal =warriorHealthTotal - orcAD;
    orcHealthTotal = orcHealthTotal - warriorAD;
  } else if(warriorHealthTotal <=0){
    $('#gameOver').html('<h2>You have been vanquished. Good luck in the next life.</h2>')
  } else if(orcHealthTotal <= 0){
    $('#gameOver').html('<h2>You are the victor! Now, bask in your own glory.</h2>')
  };
})
=======
>>>>>>> d385e32f9c2c23c6715d1922eed53cf0ac5a428f

  var randomHurt = Math.round(Math.random()+1);
  var warriorAD = ((Math.round(((warrior.strength + (warrior.class.strengthBonus/2))/3)) + (warrior.weapon.damage/randomHurt)))
  var orcAD = ((Math.round(((orc.strength + (orc.class.strengthBonus/2))/4)) + (orc.weapon.damage/randomHurt)))

  function damage(){

    warriorHealthTotal -= orcAD;
    orcHealthTotal -= warriorAD;
  };

damage()
if (warriorHealthTotal > 0 && orcHealthTotal > 0){


  $("#playerCard").html(`<h3>Player : ${warrior.playerName} </h3> <h5>Health : ${warriorHealthTotal}</h5>
                        <h5>Character : ${warrior.class.name}</h5><h5>Weapon : ${warrior.weapon.name}</h5>`)
  $("#enemyCard").html(`<h3>Enemy :${orc.class} <h3> <h5>Health : ${orcHealthTotal}
                      <h5>Weapon : ${orc.weapon.name}</h5>`)




   }else if(warriorHealthTotal <=0){
     $('#gameOver').html('<h2>You have been vanquished. Good luck in the next life.</h2>')
     $("#playerCard").hide()
     $("#enemyCard").hide()
     $("#attackButton").hide()

  }else{
     $('#gameOver').html('<h2>You are the victor! Now, bask in your own glory.</h2>')
     $("#playerCard").hide()
     $("#enemyCard").hide()
     $("#attackButton").hide()
   };

});

// got the intial stats of player and Enemy
$(".getEnemy").click(function (){
  $("#playerCard").html(`<h3>Player : ${warrior.playerName} </h3> <h5>Health : ${warriorHealthTotal}</h5>
                        <h5>Character : ${warrior.class.name}</h5><h5>Weapon : ${warrior.weapon.name}</h5>`)
  $("#enemyCard").html(`<h3>Enemy :${orc.class} <h3> <h5>Health : ${orcHealthTotal}
                      <h5>Weapon : ${orc.weapon.name}</h5>`)

<<<<<<< HEAD
// // Attack button function
// $("#attackButton").click( damage() )

// function damage(){
//   var randomHurt = Math.round(Math.random()+1);
//   var hurtRng = (Math.round(((this.strength + (this.class.strengthBonus/2))/4)) + (this.weapon.damage/randomHurt)
//   return hurtRng;
// };
//
//
// var warriorAD = damage(Gauntlet.Combatants.Human)
//
// var orcAD = damage(Gauntlet.Combatants.Orc)
=======

});








// if(humanHealthTotal !<= 0 && orcHelathTotal !<= 0){
//   warriorHealthTotal =warriorHealthTotal - orcAD;
//   orcHelathTotal = orcHelathTotal - warriorAD;
//
//
//
// }else if(warriorHealthTotal <=0){
//   //YOU DIED
// }else if(orcHelathTotal <= 0){
//   //YOU WIN
// };
>>>>>>> d385e32f9c2c23c6715d1922eed53cf0ac5a428f
