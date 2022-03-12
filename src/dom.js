import gameLogic from "./gameLogic";

const dom = (() => {
  const gridItems = document.querySelectorAll(".item");
  const gridMarks = document.querySelectorAll(".mark");
  const playerTurns = document.querySelectorAll(".turn");
  const buttonReset = document.querySelector(".reset");
  playerTurns[0].classList.add("turn-transition");

  const markColor = (color, el) => {
    el.style.color = `var(--${color})`;
    el.style.textShadow = `0 0 1rem var(--${color})`;
  };

  const changeMarkColor = (el) => {
    if (el.textContent === "X") {
      markColor("light-accent", el);
    } else {
      markColor("success", el);
    }
  };

  const changePlayerEffect = (player1, player2) => {
    playerTurns[player1].classList.add(`turn-transition`);
    playerTurns[player2].classList.remove(`turn-transition`);
  };
  const changeTurnTransition = () => {
    if (gameLogic.getCurrentTurn() === "Player X") {
      changePlayerEffect(1, 0);
    } else {
      changePlayerEffect(0, 1);
    }
  };
  return {
    gridItems,
    playerTurns,
    buttonReset,
    gridMarks,
    changeTurnTransition,
    changeMarkColor,
    changePlayerEffect,
  };
})();

export default dom;
