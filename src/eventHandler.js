import dom from "./dom";
import gameLogic from "./gameLogic";

const eventHandler = (() => {
  const clickHandler = () => {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("mark")) {
        const { index } = e.target.dataset;
        if (!e.target.textContent) {
          dom.changeTurnTransition();
          e.target.textContent = gameLogic.displayMarks(index);
          dom.changeMarkColor(e.target);
        }
      }

      if (e.target.classList.contains("reset")) {
        gameLogic.resetGame();
      }
    });
  };

  return { clickHandler };
})();

export default eventHandler;
