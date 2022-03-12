import dom from "./dom";
import players from "./players";

const gameLogic = (() => {
  const player1 = new players.Player("Player X", "X");
  const player2 = new players.Player("Player O", "O");
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = player1.name;
  let currentTurn = player1.name;
  let counter = 0;
  let isWinner = false;

  const setCurrentPlayer = (player) => (currentPlayer = player);

  const getCurrentPlayer = () => currentPlayer;

  const setCurrentTurn = (player) => (currentTurn = player);

  const getCurrentTurn = () => currentTurn;

  const changeWinBgColor = (i, j, k) => {
    const { gridMarks } = dom;
    
    gridMarks[i].classList.add("win");
    gridMarks[j].classList.add("win");
    gridMarks[k].classList.add("win");
  };

  const changeTieBgColor = () => {
    const { gridMarks } = dom;

    gridMarks.forEach((mark) => mark.classList.add("tie"));
  };

  const checkHorAndVert = (array, n, j, k) => {
    for (let i = 0; i < array.length; i += n) {
      const place =
        array[i] === array[i + j] && array[i + k] === array[i] && array[i + j];
      if (place) {
        changeWinBgColor(i, j + i, k + i);
        return true;
      }
    }
  };

  const checkDiagonal = (array, i, j, k) => {
    const place = array[i] === array[j] && array[k] === array[i] && array[j];
    if (place) {
      changeWinBgColor(i, j, k);
      return true;
    }
  };

  const checkTie = () => {
    if (counter === 9 && !isWinner) {
      changeTieBgColor();
      return true;
    }
  };

  const checkWinCondition = () => {
    const checkHorizontal = checkHorAndVert(gameBoard, 3, 1, 2);
    const checkVertical = checkHorAndVert(gameBoard, 1, 3, 6);
    const checkLeftDiagonal = checkDiagonal(gameBoard, 0, 4, 8);
    const checkRightDiagonal = checkDiagonal(gameBoard, 2, 4, 6);

    return (
      checkHorizontal ||
      checkVertical ||
      checkLeftDiagonal ||
      checkRightDiagonal
    );
  };

  const clearBoard = (array) => {
    for (let i = 0; i < array.length; i++) {
      array[i] = "";
    }
    dom.gridMarks.forEach((mark) => (mark.textContent = ""));
    counter = 0;
    isWinner = false;
  };

  const clearPlayer = () => {
    currentPlayer = player1.name;
    currentTurn = player1.name;
  };

  const resetGame = () => {
    const { changePlayerEffect, gridMarks } = dom;
    clearBoard(gameBoard);
    clearPlayer();
    changePlayerEffect(0, 1);
    gridMarks.forEach((mark) => {
      mark.classList.remove("win");
      mark.classList.remove("tie");
    });
  };

  const announceEndGame = () => {
    if (checkWinCondition()) {
      const playerWinner = getCurrentPlayer();
      isWinner = true;
      console.log(`${playerWinner} wins`);
      setTimeout(() => {
        resetGame();
      }, 500);
    }
    if (checkTie()) {
      setTimeout(() => {
        console.log("It's a tie");
        resetGame();
      }, 500);
    }
  };

  const addMark = (index, playerMark, player, nextTurn) => {
    gameBoard.splice(index, 1, playerMark);
    counter += 1;
    setCurrentPlayer(player);
    setCurrentTurn(nextTurn);
    announceEndGame();
    return playerMark;
  };

  const displayMarks = (index) => {
    if (currentTurn === player1.name) {
      return addMark(index, player1.mark, player1.name, player2.name);
    }
    return addMark(index, player2.mark, player2.name, player1.name);
  };

  return {
    addMark,
    displayMarks,
    getCurrentTurn,
    resetGame,
    currentTurn,
    currentPlayer,
  };
})();

export default gameLogic;
