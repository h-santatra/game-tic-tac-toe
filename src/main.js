import "./style.css";
function gameTTT() {
  let board = document.querySelectorAll("button[class*='case-']");
  board.textContent = "";
  let boardArray = Array.from(board);
  let board2d = []; // This will be the 2D array
  let rowSize = 3; // Number of items in each subarray

  for (let i = 0; i < boardArray.length; i += rowSize) {
    board2d.push(boardArray.slice(i, i + rowSize));
  }

  let currentPlayer = "X";
  let winner = null;
  let isGameOver = false;
  let playerturn = document.querySelector(".playerturn");
  let thewinner = document.querySelector(".thewinner");
  let x = 0;
  let o = 0;
  let xScore = document.querySelector(".xScore");
  let oScore = document.querySelector(".oScore");

  function switchPlayer() {
    if (currentPlayer === "X") {
      currentPlayer = "O";
      tunOrderDisplay();
    } else {
      currentPlayer = "X";
      tunOrderDisplay();
    }
  }

  function makeMove(row, col) {
    if (isGameOver) return;

    if (board2d[row][col].textContent === "") {
      board2d[row][col].textContent = currentPlayer; // Update cell with current player's move
      checkWinner(); // Check for a winner or draw
      scoreGame();

      // If the game is over, disable all buttons
      if (isGameOver) {
        boardArray.forEach((button) => {
          button.disabled = true;
        });
      } else {
        // If the game continues, switch to the next player
        switchPlayer();
      }
    }
  }
  function checkWinner() {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board2d[i][0].textContent &&
        board2d[i][0].textContent === board2d[i][1].textContent &&
        board2d[i][1].textContent === board2d[i][2].textContent
      ) {
        winner = board2d[i][0].textContent;
        thewinner.textContent = "The Winner is : " + winner;
        isGameOver = true;
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board2d[0][i].textContent &&
        board2d[0][i].textContent === board2d[1][i].textContent &&
        board2d[1][i].textContent === board2d[2][i].textContent
      ) {
        winner = board2d[0][i].textContent;
        thewinner.textContent = "The Winner is : " + winner;
        isGameOver = true;
        return;
      }
    }

    // Check diagonals
    if (
      board2d[0][0].textContent &&
      board2d[0][0].textContent === board2d[1][1].textContent &&
      board2d[1][1].textContent === board2d[2][2].textContent
    ) {
      winner = board2d[0][0].textContent;
      thewinner.textContent = "The Winner is : " + winner;
      isGameOver = true;
      return;
    }

    if (
      board2d[0][2].textContent &&
      board2d[0][2].textContent === board2d[1][1].textContent &&
      board2d[1][1].textContent === board2d[2][0].textContent
    ) {
      winner = board2d[0][2].textContent;
      thewinner.textContent = "The Winner is : " + winner;
      isGameOver = true;
      return;
    }

    // Check for a draw
    let hasEmptySpace = boardArray.some((button) => button.textContent === "");
    if (!hasEmptySpace) {
      thewinner.textContent = "Wow, this is a draw!";
      isGameOver = true;
    }
  }
  function resetGame() {
    currentPlayer = "X";
    winner = null;
    isGameOver = false;
    boardArray.forEach((button) => {
      button.textContent = "";
      button.disabled = false;
    });
    document.querySelector(".playerturn").textContent =
      "Turn round : " + currentPlayer;
    document.querySelector(".thewinner").textContent = "";
  }
  function scoreGame() {
    if (winner === "X") {
      x += 1;
      o += 0;
      xScore.textContent = "Score X : " + x;
      oScore.textContent = "Score O : " + o;
    }
    if (winner === "O") {
      o += 1;
      x += 0;
      xScore.textContent = "Score X : " + x;
      oScore.textContent = "Score O : " + o;
    } else {
      xScore.textContent = "Score X : " + x;
      oScore.textContent = "Score O : " + o;
    }
    return [x, o];
  }
  function scoreReset() {
    x = 0;
    o = 0;
    xScore.textContent = "Score X : " + x;
    oScore.textContent = "Score O : " + o;
    resetGame();
    return [x, o];
  }

  /**************************/

  function scoreButton() {
    let resetScore = document.querySelector(".resetscore");
    resetScore.addEventListener("click", scoreReset);
  }

  function tunOrderDisplay() {
    if (currentPlayer === "O") {
      playerturn.textContent = "Turn round : " + currentPlayer;
    }
    if (currentPlayer === "X") {
      playerturn.textContent = "Turn round : " + currentPlayer;
    }
  }

  function resetButton() {
    let resetG = document.querySelector(".resetgame");
    resetG.addEventListener("click", resetGame);
  }

  function boardButton() {
    boardArray.forEach((button, index) => {
      let row = Math.floor(index / rowSize);
      let col = index % rowSize;
      button.addEventListener("click", () => {
        makeMove(row, col);
      });
    });
  }
  return {
    resetButton,
    boardButton,
    scoreButton,
  };
}
var modal = document.getElementById("myModal");
var btn = document.getElementById("gameRules");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let game = gameTTT();
game.resetButton();
game.scoreButton();
game.boardButton();
