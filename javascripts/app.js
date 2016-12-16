
var warrior = new Gauntlet.Combatants.Human();


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


  if (warriorHealthTotal > 0 && orcHealthTotal > 0){

//Much random, very dead, such hurt
    var randomHurt = 1+Math.round(Math.random()*4);
    var warriorAD = ((Math.round(((warrior.strength + (warrior.class.strengthBonus/5))/4)) + (warrior.weapon.damage-randomHurt)))
    var orcAD = ((Math.round(((orc.strength + (orc.class.strengthBonus/5))/6)) + (orc.weapon.damage-randomHurt)))

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
    $("#battleReport").html(`<h4>You hit the orc ${orc.class} for ${warriorAD} damage!</h4>
                          <h4>The Orc ${orc.class} hit you for ${orcAD} damage!</h4>`)




     }else if(warriorHealthTotal <=0){
       $("#battleReport").html(`<h4>You hit the orc ${orc.class} for ${warriorAD} damage!</h4>
                             <h4>The Orc ${orc.class} hit you for ${orcAD} damage!</h4>`)
       $('#gameOver').html('<h2>You have been vanquished. Good luck in the next life.</h2><button id="playAgain" class="btn-text">Play Again!</button>')
       $("#playerCard").hide()
       $("#enemyCard").hide()
       $("#attackButton").hide()


    }else{
      $("#battleReport").html(`<h4>You hit the orc ${orc.class} for ${warriorAD} damage!</h4>
                            <h4>The Orc ${orc.class} hit you for ${orcAD} damage!</h4>`)
      $('#gameOver').html('<h2>You are the victor! Now, bask in your own glory.</h2><button id="playAgain" class="btn-text">Play Again!</button>')
      $("#playerCard").hide()
      $("#enemyCard").hide()
      $("#attackButton").hide()
     };
     $("#playAgain").click(function goBack(){
      window.history.go(0)
     })
  }
});

// got the intial stats of player and Enemy
$(".getEnemy").click(function (){
  $("#playerCard").html(`<h3>Player : ${warrior.playerName} </h3> <h5>Health : ${warriorHealthTotal}</h5>
                        <h5>Character : ${warrior.class.name}</h5><h5>Weapon : ${warrior.weapon.name}</h5>`)
  $("#enemyCard").html(`<h3>Enemy :${orc.class} <h3> <h5>Health : ${orcHealthTotal}
                      <h5>Weapon : ${orc.weapon.name}</h5>`)

});
