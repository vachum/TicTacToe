import { game } from "./game.js";
const canvas = document.getElementById("canv");
const form = document.getElementById("form");

const btn = document.querySelector(".try");
const ctx = canvas.getContext("2d");
let valPlayerOne = "";
let valPlayerTwo = "";
const winnerText = document.querySelector(".winner");

let arrOne = [];
let arrTwo = [];
//generate btn click function --------------------------------------------

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    document.querySelector("#pTwo").value != "" &&
    document.querySelector("#pOne").value != ""
  ) {
    valPlayerOne = document.querySelector("#valOne").value;
    valPlayerTwo = document.querySelector("#valTwo").value;
    if (valPlayerOne == valPlayerTwo) {
      valPlayerOne = "X";
      document.querySelector("#valOne").selectedIndex = 0;
      valPlayerTwo = "O";
      document.querySelector("#valTwo").selectedIndex = 1;
    }
    const params = document.querySelector(".width").value * 100;
    game.size = params;
    canvas.width = params;
    canvas.height = params;
    //load player val data and form data
    const data = new FormData(form);
    const znak1 = data.get("playerOneVal");
    const znak2 = data.get("playerTwoVal");

    game.players = {
      [znak1]: data.get("playerOne"),
      [znak2]: data.get("playerTwo"),
    };

    game.currentPlayer = znak1;
    // functions on click

    rectFill(params);
  }
});
//canvas generator function  --------------------------------------------

function rectFill(params) {
  let numWidth = canvas.width / (params / 100);
  for (let a = 0; a < numWidth * 2; a++) {
    for (let i = 0; i < numWidth; i++) {
      ctx.strokeRect(i * 100, a * 100, numWidth, numWidth);
    }
  }
}

//mouse position with shape positioning--------------------------------------------
let c = 0;
function getMousePosition(canvas, event) {
  const paramsTwo = document.querySelector(".width").value * 100;
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  //zaokrouhlení na celá čísla
  x = Math.round(x);
  y = Math.round(y);

  //centering of shapes
  for (let w = 0; w < paramsTwo / 100; w++) {
    if (x > w * 100 && x < w * 100 + 100) {
      x = w * 100 + 50;
    }
  }

  for (let q = 0; q < paramsTwo / 100; q++) {
    if (y > q * 100 && y < q * 100 + 100) {
      y = q * 100 + 50;
    }
  }

  //coordinates print
  if (c % 2 == 0) {
    arrOne.push([x, y]);
    game.coordinates.push([x, y, valPlayerOne]);
  } else {
    arrTwo.push([x, y, valPlayerTwo]);
    game.coordinates.push([x, y, valPlayerTwo]);
  }
  console.log("x: " + x + "\ny: " + y);

  //changing coordinates on click

  fillAgain();

  c += 1;
}

function fillAgain() {
  if (game.coordinates[c][2] == "X") {
    ctx.beginPath();
    ctx.arc(game.coordinates[c][0], game.coordinates[c][1], 50, 0, 2 * Math.PI);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(game.coordinates[c][0], game.coordinates[c][1], 50, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
  }
}

function fillAfter() {
  for (let k = 0; k < game.coordinates.length; k++) {
    if (game.coordinates[k][2] === "X") {
      ctx.beginPath();
      ctx.moveTo(game.coordinates[k][0] - 20, game.coordinates[k][1] - 20);
      ctx.lineTo(game.coordinates[k][0] + 20, game.coordinates[k][1] + 20);
      ctx.moveTo(game.coordinates[k][0] + 20, game.coordinates[k][1] - 20);
      ctx.lineTo(game.coordinates[k][0] - 20, game.coordinates[k][1] + 20);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(
        game.coordinates[k][0],
        game.coordinates[k][1],
        20,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }
  }
}

let f = 0;
let u = 0;

let winCount = 0;

function checkingOne() {
  console.log("arrOne je: " + arrOne);

  if (arrOne.length >= 2) {
    for (let i = 0; i < arrOne.length; i++) {
      for (let j = 0; j < arrOne.length; j++) {
        if (arrOne[i][1] === arrOne[j][1]) {
          if (
            arrOne[i][0] + 100 === arrOne[j][0] ||
            arrOne[i][0] - 100 === arrOne[j][0]
          ) {
            console.log("2 spravne");
            for (let k = 0; k < arrOne.length; k++) {
              if (arrOne[j][1] === arrOne[k][1]) {
                if (arrOne[j][0] + 200 === arrOne[k][0]) {
                  console.log("Vyhra");
                  ctx.beginPath();
                  ctx.moveTo(arrOne[i][0] - 100, arrOne[i][1]);
                  ctx.lineTo(arrOne[k][0], arrOne[k][1]);
                  ctx.stroke();
                  return true;
                }
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < arrOne.length; i++) {
      for (let j = 0; j < arrOne.length; j++) {
        if (arrOne[i][0] === arrOne[j][0]) {
          if (
            arrOne[i][1] + 100 === arrOne[j][1] ||
            arrOne[i][1] - 100 === arrOne[j][1]
          ) {
            console.log("2 spravne");
            for (let k = 0; k < arrOne.length; k++) {
              if (arrOne[j][0] === arrOne[k][0]) {
                if (arrOne[j][1] + 200 === arrOne[k][1]) {
                  console.log("Vyhra");
                  ctx.beginPath();
                  ctx.moveTo(arrOne[i][0], arrOne[i][1] - 100);
                  ctx.lineTo(arrOne[k][0], arrOne[k][1]);
                  ctx.stroke();
                  return true;
                }
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < arrOne.length; i++) {
      for (let j = 0; j < arrOne.length; j++) {
        if (
          arrOne[i][1] + 100 === arrOne[j][1] ||
          arrOne[i][1] - 100 === arrOne[j][1]
        ) {
          if (
            arrOne[i][0] + 100 === arrOne[j][0] ||
            arrOne[i][0] - 100 === arrOne[j][0]
          ) {
            console.log("2 spravne");
            for (let k = 0; k < arrOne.length; k++) {
              if (arrOne[j][1] + 200 === arrOne[k][1]) {
                if (arrOne[j][0] + 200 === arrOne[k][0]) {
                  console.log("Vyhra");
                  ctx.beginPath();
                  ctx.moveTo(arrOne[i][0] - 100, arrOne[i][1] - 100);
                  ctx.lineTo(arrOne[k][0], arrOne[k][1]);
                  ctx.stroke();
                  return true;
                }
              }

              if (arrOne[j][1] - 200 === arrOne[k][1]) {
                if (arrOne[j][0] + 200 === arrOne[k][0]) {
                  console.log("Vyhra");
                  ctx.beginPath();
                  ctx.moveTo(arrOne[i][0] - 100, arrOne[i][1] + 100);
                  ctx.lineTo(arrOne[k][0], arrOne[k][1]);
                  ctx.stroke();
                  return true;
                }
              }
            }
          }
        }
      }
    }
  }
}

function checkingTwo() {
  console.log("arrTwo je: " + arrOne);

  if (arrOne.length >= 2) {
    for (let i = 0; i < arrTwo.length; i++) {
      for (let j = 0; j < arrTwo.length; j++) {
        if (arrTwo[i][1] === arrTwo[j][1]) {
          if (
            arrTwo[i][0] + 100 === arrTwo[j][0] ||
            arrTwo[i][0] - 100 === arrTwo[j][0]
          ) {
            console.log("2 spravne");
            for (let k = 0; k < arrTwo.length; k++) {
              if (arrTwo[j][1] === arrTwo[k][1]) {
                if (arrTwo[j][0] + 200 === arrTwo[k][0]) {
                  console.log("Vyhra");
                  ctx.beginPath();
                  ctx.moveTo(arrTwo[i][0] - 100, arrTwo[i][1]);
                  ctx.lineTo(arrTwo[k][0], arrTwo[k][1]);
                  ctx.stroke();
                  return true;
                }
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < arrTwo.length; i++) {
      for (let j = 0; j < arrTwo.length; j++) {
        if (arrTwo[i][0] === arrTwo[j][0]) {
          if (
            arrTwo[i][1] + 100 === arrTwo[j][1] ||
            arrTwo[i][1] - 100 === arrTwo[j][1]
          ) {
            console.log("2 spravne");
            for (let k = 0; k < arrTwo.length; k++) {
              if (arrTwo[j][0] === arrTwo[k][0]) {
                if (arrTwo[j][1] + 200 === arrTwo[k][1]) {
                  console.log("Vyhra");
                  ctx.beginPath();
                  ctx.moveTo(arrTwo[i][0], arrTwo[i][1] - 100);
                  ctx.lineTo(arrTwo[k][0], arrTwo[k][1]);
                  ctx.stroke();
                  return true;
                }
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < arrTwo.length; i++) {
      for (let j = 0; j < arrTwo.length; j++) {
        if (
          arrTwo[i][1] + 100 === arrTwo[j][1] ||
          arrTwo[i][1] - 100 === arrTwo[j][1]
        ) {
          if (
            arrTwo[i][0] + 100 === arrTwo[j][0] ||
            arrTwo[i][0] - 100 === arrTwo[j][0]
          ) {
            console.log("2 spravne");
            for (let k = 0; k < arrTwo.length; k++) {
              if (arrTwo[j][1] + 200 === arrTwo[k][1]) {
                if (arrTwo[j][0] + 200 === arrTwo[k][0]) {
                  console.log("Vyhra");
                  ctx.beginPath();
                  ctx.moveTo(arrTwo[i][0] - 100, arrTwo[i][1] - 100);
                  ctx.lineTo(arrTwo[k][0], arrTwo[k][1]);
                  ctx.stroke();

                  return true;
                }
              }

              if (arrTwo[j][1] - 200 === arrTwo[k][1]) {
                if (arrTwo[j][0] + 200 === arrTwo[k][0]) {
                  console.log("Vyhra");
                  ctx.beginPath();
                  ctx.moveTo(arrTwo[i][0] - 100, arrTwo[i][1] + 100);
                  ctx.lineTo(arrTwo[k][0], arrTwo[k][1]);
                  ctx.stroke();
                  return true;
                }
              }
            }
          }
        }
      }
    }
  }
}

//mouse click function-------------------------------------------------------------
let canvasElem = document.querySelector("canvas");

let z = 0;

canvasElem.addEventListener("mousedown", function (e) {
  z++;
  getMousePosition(canvasElem, e);
  console.log(ctx.width);
  ctx.width = game.size;
  ctx.height = game.size;
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  rectFill(game.size);
  fillAfter();
  checkingOne();
  checkingTwo();

  if (checkingOne() === true) {
    console.log("HALOOOOOOO");
    winnerText.innerHTML = "Vyhrál: " + document.querySelector("#pOne").value;
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  if (checkingTwo() === true) {
    console.log("HALOOOOO");
    winnerText.innerHTML = "Vyhrál: " + document.querySelector("#pTwo").value;

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
});
