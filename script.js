const gameBoard = document.getElementById("gameBoard");
const resultDisplay = document.getElementById("result");
const resetButton = document.getElementById("reset");
const twoPlayerButton = document.getElementById("twoPlayer");
const playComputerButton = document.getElementById("playComputer");

let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = false;
let isComputerMode = false;

function renderBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    if (cell) cellDiv.classList.add("taken");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleMove(index));
    gameBoard.appendChild(cellDiv);
  });
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes(null) ? null : "Draw";
}

function handleMove(index) {
  if (!isGameActive || board[index]) return;

  board[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    isGameActive = false;
    resultDisplay.textContent =
      winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
    resetButton.disabled = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (isComputerMode && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((cell) => cell !== null);

  const randomMove =
    availableMoves[Math.floor(Math.random() * availableMoves.length)];

  handleMove(randomMove);
}

function startGame(mode) {
  isGameActive = true;
  isComputerMode = mode === "computer";
  board = Array(9).fill(null);
  currentPlayer = "X";
  resultDisplay.textContent = "";
  resetButton.disabled = true;
  renderBoard();
}

twoPlayerButton.addEventListener("click", () => startGame("twoPlayer"));
playComputerButton.addEventListener("click", () => startGame("computer"));
resetButton.addEventListener("click", () => startGame(isComputerMode ? "computer" : "twoPlayer"));

renderBoard();
