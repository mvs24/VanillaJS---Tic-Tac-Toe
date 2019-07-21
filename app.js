const squares = document.querySelectorAll(".square");
let firstPlayer = "X";
let secondPLayer = "O";
let player = firstPlayer;
let previousPlayer = secondPLayer;

let player1 = [];
let player2 = [];

let winner = null;
let draw = false;

let winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 3, 6]
];

document.querySelector("button").addEventListener("click", () => {
  //   window.location.reload();
  squares.forEach(square => {
    square.textContent = "";
    player1 = [];
    player2 = [];
    document.querySelector(".result").innerHTML = "";
  });
});
eventListeners();

function eventListeners() {
  squares.forEach(square => {
    square.addEventListener("click", e => {
      let id = e.target.id;
      move(id);
    });
  });
}

function move(id) {
  if (isSquareChecked(id)) {
    counter++;
    player = previousPlayer;
  }

  document.querySelector(`.square${id}`).textContent = player;
  if (player === firstPlayer) {
    player1.push(parseInt(id));
    player = secondPLayer;
  } else {
    player2.push(parseInt(id));
    player = firstPlayer;
  }
  winner = isWinner(player1, player2);
  draw = isDraw();

  displayWinner() || displayDraw();
}

function isSquareChecked(id) {
  square = document.querySelector(`.square${id}`).textContent;
  if (square === "") {
    return false;
  }
  return true;
}

function isWinner(player1, player2) {
  winCombos.forEach(winCombo => {
    if (isThereAnyWinner(winCombo, player1)) {
      winner = firstPlayer;
    }
  });
  winCombos.forEach(winCombo => {
    if (isThereAnyWinner(winCombo, player2)) {
      winner = secondPLayer;
    }
  });
  return winner;
}

function isThereAnyWinner(winCombos, arr2) {
  let counter = 0;
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < winCombos.length; j++) {
      if (arr2[i] === winCombos[j]) {
        counter++;
      }
    }
  }
  if (counter >= 3) {
    return true;
  } else {
    return false;
  }
}

function isDraw() {
  if (!winner && player1.length + player2.length === 9) {
    return true;
  }
  return false;
}

function displayWinner() {
  if (winner) {
    document.querySelector(".result").innerHTML = `
      <h1>The winner is ${winner}</h1>
      `;
    return true;
  }
  return false;
}

function displayDraw() {
  if (draw) {
    document.querySelector(".result").innerHTML = `
        <h1>The game ended in draw</h1>
        `;
    return true;
  }
  return false;
}
