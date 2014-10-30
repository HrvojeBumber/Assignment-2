// <reference path="jquery.js" />

var stage;
var betPlayer: createjs.Text;
var jackPot;
var currentMoney;
var hundred = 100;
var tooHundred = 200;
var treeHundred = 300;
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = new createjs.Bitmap("images/blank.png");
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                var grape = new createjs.Bitmap("images/grapes.jpg");
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                var bannana = new createjs.Bitmap("images/bannana.jpg");
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                var orange = new createjs.Bitmap("images/orange.jpg");
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                var cherrie = new createjs.Bitmap("images/cherries.jpg");
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                var bar = new createjs.Bitmap("images/bar.jpg");
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                var bell = new createjs.Bitmap("images/bells.jpg");
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                var numSeven = new createjs.Bitmap("images/7.jpg");
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}

/* When the player clicks the spin button the game kicks off */

function spin(){
    playerBet = $("div#betEntry>input").val();

    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();

        spinResult[0].x = 74;
        spinResult[0].y = 211;

        spinResult[1].x = 153;
        spinResult[1].y = 211;

        spinResult[2].x = 226;
        spinResult[2].y = 211;

        stage.addChild(spinResult[0], spinResult[1], spinResult[2]);
       

        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }


};
//set the variable oHundred to 100$ to add to the current bet
function oHundred() {
    playerBet = 100;
    betPlayer.text = "100";
    
}
//set the variable tHundred to 200$ to add to the current bet
function tHundred() {
    playerBet = 200;
    betPlayer.text = "200";
}
//set the variable trHundred to 300$ to add to the current bet
function trHundred() {
    playerBet = 300;
    betPlayer.text = "300";
}

function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    drawSlotMachine();
}
function handleTick() {
   stage.update();
}
function drawSlotMachine() {
    //input the winnings, jackpot, bet
    var slotmachine = new createjs.Bitmap("images/Slot Machine.jpg");

    //betPlayer is the amount the player bets and the location it is placed on the slot machine
    betPlayer = new createjs.Text("$" + playerBet.toString(), "30px Ariel", "white");
    betPlayer.x = 37;
    betPlayer.y = 129;

    //jackPot is the amount the jackpot is worth and the location it is placed on the slot machine
    jackPot = new createjs.Text("$" + jackpot.toString(), "30px Ariel", "white");
    jackPot.x = 222;
    jackPot.y = 129;

    //currentMoney is the current money the player has and the location it is placed on the slot machine
    currentMoney = new createjs.Text("$" + playerMoney.toString(), "30px Ariel", "white");
    currentMoney.x = 35;
    currentMoney.y = 313;

   //int the fruits/bell/number/bars
    var numSeven = new createjs.Bitmap("images/7.jpg");
    numSeven.x = 74;
    numSeven.y = 211;

    var numSeven2 = new createjs.Bitmap("images/7.jpg");
    numSeven2.x = 153;
    numSeven2.y = 211;

    var numSeven3 = new createjs.Bitmap("images/7.jpg");
    numSeven3.x = 226;
    numSeven3.y = 211;

   

    //int the images and adjust them to the proper location
    var spinButton = new createjs.Bitmap("images/blackbutton.png");
    spinButton.x = 105;
    spinButton.y = 376;

    var powerButton = new createjs.Bitmap("images/powerbutton.png");
    powerButton.x = 10;
    powerButton.y = 376;

    var oneHundred = new createjs.Bitmap("images/100.png");
    oneHundred.x = 169;
    oneHundred.y = 376;

    var twoHundred = new createjs.Bitmap("images/200.png");
    twoHundred.x = 226;
    twoHundred.y = 376;

    var threeHundred = new createjs.Bitmap("images/300.png");
    threeHundred.x = 284;
    threeHundred.y = 376;

    stage.addChild(slotmachine);
    stage.addChild(numSeven);
    stage.addChild(numSeven2);
    stage.addChild(numSeven3);
    stage.addChild(spinButton);
    stage.addChild(powerButton);
    stage.addChild(oneHundred);
    stage.addChild(twoHundred);
    stage.addChild(threeHundred);
    stage.addChild(betPlayer);
    stage.addChild(jackPot);
    stage.addChild(currentMoney);
    

    //when spin/100/200/300/exit button clicked, function goes
    spinButton.addEventListener("click", spin);
    oneHundred.addEventListener("click", oHundred);
    twoHundred.addEventListener("click", tHundred);
    threeHundred.addEventListener("click", trHundred);

} 