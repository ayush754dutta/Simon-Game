"use strict";

//  color arr:

const colorArr = ["red", "green", "yellow", "blue"];

// generate random number:

const randomNum = () => {
  return Math.trunc(Math.random() * 4);
};

let r = randomNum();

// create randomChosenColor:
let randomChosenColor = colorArr[r];

// play audio:

const playMusic = () => {
  return new Audio(`./${randomChosenColor}.mp3`);
};

const wrongMusic = () => {
  return new Audio("./wrong.mp3");
};

// playing variable:

let playing = false;

// start level:
let level = 0;
console.log(level);
// keypress event:

$(document).keypress((e) => {
  $("#level-title").text(`level ${(level += 1)}`);
  console.log(level);

  playing = true;
});

// game pattern and userchosen arrays:

const gamePattern = [];
const userClickedPattern = [];

// selecting container:

$(".container").click((e) => {
  $(`#${e.target.id}`).animate({ opacity: 0.5 }).animate({ opacity: 1 });
  if (playing) {
    if (randomChosenColor === e.target.id) {
      playMusic().play();
      $("#level-title").text(`level ${(level += 1)}`);
      console.log(level);
      gamePattern.push(randomChosenColor);
      console.log(gamePattern);
      userClickedPattern.push(e.target.id);
      console.log(userClickedPattern);
      r = randomNum();
      randomChosenColor = colorArr[r];
      return;
    }

    if (
      e.target.classList.contains("btn") &&
      e.target.id !== randomChosenColor
    ) {
      wrongMusic().play();
      setTimeout(() => {
        $("body").addClass("game-over");
      }, 100);

      setTimeout(() => {
        $("body").css("backgroundColor", "#011F3F");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      level = 0;
      r = randomNum();
      randomChosenColor = colorArr[r];
      userClickedPattern.push(e.target.id);
      console.log(userClickedPattern);
    }
  }
  console.log(gamePattern);
});

// restarting the game:
playing = false;
$(document).keypress((e) => {
  $("#level-title").text("level 1");
  playing = true;
  level = 0;
});
