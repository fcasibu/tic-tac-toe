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
  let currentPlayer = [];
  let count = 0;

  const addMarker = (e) => {
    let endArr = currentPlayer.length - 1;
    if (e.target.classList.contains("mark")) {
      if (!e.target.textContent) {
        if (
          !currentPlayer.length ||
          currentPlayer[endArr] === players.player2
        ) {
          e.target.textContent = players.player1;
          currentPlayer.push(players.player1);
          count++;
        } else if (currentPlayer[endArr] === players.player1) {
          e.target.textContent = players.player2;
          currentPlayer.push(players.player2);
          count++;
        }
      } else {
        console.log("not empty");
      }
    }
  };

  const displayController = (e) => {
    const index = e.target.dataset.index;
    addMarker(e);
    styleText(e);
    gameBoard.splice(index, 1, currentPlayer[currentPlayer.length - 1]);
    currentTurn();
    console.log(count);
    setTimeout(() => {
      checkWinner();
    }, 1000);
  };

  const styleText = (e) => {
    if (e.target.classList.contains("mark")) {
      if (e.target.textContent === players.player1) {
        e.target.style.color = "var(--light-accent)";
        e.target.style.textShadow = "0 0 1rem var(--light-accent)";
      } else {
        e.target.style.color = "var(--success)";
        e.target.style.textShadow = "0 0 1rem var(--success)";
      }
    }
  };

  const currentTurn = () => {
    const playerTurns = document.querySelectorAll(".turn");
    if (
      currentPlayer[currentPlayer.length - 1] === players.player2 ||
      !currentPlayer.length
    ) {
      playerTurns[0].classList.add("player-one-transition");
      playerTurns[1].classList.remove("player-two-transition");
    } else if (currentPlayer[currentPlayer.length - 1] === players.player1) {
      playerTurns[1].classList.add("player-two-transition");
      playerTurns[0].classList.remove("player-one-transition");
    }
  };

  const checkWinner = () => {
    let endArr = currentPlayer.length - 1;
    if (condition(gameBoard, currentPlayer[endArr])) {
      alert(`${currentPlayer.pop()} won`);
      clearBoard();
    } else if (count === 9 && !condition(gameBoard, currentPlayer[endArr])) {
      alert("It's a tie");
      clearBoard();
    }
  };

  const clearBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard.splice(i, 1, "");
      items[i].children[0].textContent = "";
      currentPlayer = [];
      count = 0;
    }
    currentTurn();
  };

  const resetBoard = (e) => {
    if (e.target.classList.contains("reset")) {
      clearBoard();
    }
  };

  return {
    displayController,
    currentTurn,
    resetBoard
  };
})();

Gameboard.currentTurn();
document.addEventListener("click", (e) => {
  Gameboard.displayController(e);
  Gameboard.resetBoard(e);
});
