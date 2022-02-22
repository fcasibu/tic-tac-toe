function Players(player1, player2) {
  return {
    player1,
    player2
  };
}

function condition(gameBoard, currentPlayer) {
  return (
    (gameBoard[0] === currentPlayer &&
      gameBoard[1] === currentPlayer &&
      gameBoard[2] === currentPlayer) ||
    (gameBoard[3] === currentPlayer &&
      gameBoard[4] === currentPlayer &&
      gameBoard[5] === currentPlayer) ||
    (gameBoard[6] === currentPlayer &&
      gameBoard[7] === currentPlayer &&
      gameBoard[8] === currentPlayer) ||
    (gameBoard[0] === currentPlayer &&
      gameBoard[3] === currentPlayer &&
      gameBoard[6] === currentPlayer) ||
    (gameBoard[1] === currentPlayer &&
      gameBoard[4] === currentPlayer &&
      gameBoard[7] === currentPlayer) ||
    (gameBoard[2] === currentPlayer &&
      gameBoard[5] === currentPlayer &&
      gameBoard[8] === currentPlayer) ||
    (gameBoard[0] === currentPlayer &&
      gameBoard[4] === currentPlayer &&
      gameBoard[8] === currentPlayer) ||
    (gameBoard[2] === currentPlayer &&
      gameBoard[4] === currentPlayer &&
      gameBoard[6] === currentPlayer)
  );
}

const Gameboard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const items = document.querySelectorAll(".item");
  const players = Players("X", "O");
  let currentPlayer = players.player1;

  const addMarker = () => {
    items.forEach((item) =>
      item.addEventListener("click", () => {
        const index = +item.dataset.index;
        if (currentPlayer === players.player1) {
          if (!item.textContent) {
            item.textContent = players.player1;
            currentPlayer = players.player2;
            gameBoard.splice(index, 1, item.textContent);
          }
        } else if (currentPlayer === players.player2) {
          if (!item.textContent) {
            item.textContent = players.player2;
            currentPlayer = players.player1;
            gameBoard.splice(index, 1, item.textContent);
          }
        }
      })
    );
  };

  const checkWinner = () => {
    if (condition(gameBoard, currentPlayer)) {
      console.log(`${currentPlayer}`);
    }
  };

  return { gameBoard, items, addMarker, checkWinner };
})();
