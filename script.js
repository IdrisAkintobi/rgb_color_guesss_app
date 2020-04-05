var h1 = document.querySelector("h1");
var displayCode = document.getElementById("color-code");
var message = document.querySelector("#message");
var boxes = document.querySelectorAll(".box");
var resetButton = document.querySelector("button");
var mode = document.querySelectorAll(".mode");
var boxNum = 6;
var colorList = [];
var correctColor;

// Function to generate random RGB number
function ranCode() {
  return Math.floor(Math.random() * 257);
}
// Function to create RGB code with generated random number
function randomRGB() {
  var test = [ranCode(), ranCode(), ranCode()].join(", ");
  return "rgb(" + test + ")";
}
// Function to create a list of colors
function makeColorList(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomRGB());
  }
  return arr;
}
// Running background change on boxes with colorList index ***box with no colorList index got hidden***
function mixBG(num) {
  colorList = makeColorList(num);
  for (var i = 0; i < boxes.length; i++) {
    if (colorList[i]) {
      boxes[i].style.background = colorList[i];
      boxes[i].style.visibility = "visible";
    } else {
      boxes[i].style.visibility = "hidden";
    }
  }
}
function pickColor() {
  h1.style.background = "steelblue";
  message.textContent = "";
  resetButton.textContent = "Change Colors";
  correctColor = colorList[Math.floor(Math.random() * colorList.length)];
  displayCode.textContent = correctColor;
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
      if (this.style.background === correctColor) {
        message.textContent = "Correct!!!";
        boxes.forEach(function (box) {
          box.style.background = correctColor;
        });
        h1.style.background = correctColor;
        resetButton.textContent = "Play Again";
      } else {
        this.style.background = "transparent";
        message.textContent = "Try Again";
      }
    });
  }
}
// Create eventListener for each button in mode
for (var i = 0; i < mode.length; i++) {
  mode[i].addEventListener("click", function () {
    mode[0].classList.remove("active");
    mode[1].classList.remove("active");
    this.classList.add("active");
    this.textContent === "Easy" ? (boxNum = 3) : (boxNum = 6);
    play();
  });
}
//Create play function to run game
function play() {
  mixBG(boxNum);
  pickColor();
}
// Add eventListener to reset button to restart game when clicked
resetButton.addEventListener("click", play);
play();
