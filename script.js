const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const gameStatus = document.getElementById('gameStatus');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(event) {
  const index = event.target.getAttribute('data-index');

  if (!board[index] && !isGameOver) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameStatus.textContent = `${board[a]} wins!`;
      isGameOver = true;
      return;
    }
  }

  if (!board.includes(null)) {
    gameStatus.textContent = 'It\'s a tie!';
    isGameOver = true;
  }
}

function resetGame() {
  board.fill(null);
  isGameOver = false;
  currentPlayer = 'X';
  gameStatus.textContent = '';
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

gameBoard.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
