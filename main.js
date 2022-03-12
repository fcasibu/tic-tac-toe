/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameLogic */ "./src/gameLogic.js");


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
    if (_gameLogic__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentTurn() === "Player X") {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);


/***/ }),

/***/ "./src/eventHandler.js":
/*!*****************************!*\
  !*** ./src/eventHandler.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameLogic */ "./src/gameLogic.js");



const eventHandler = (() => {
  const clickHandler = () => {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("mark")) {
        const { index } = e.target.dataset;
        if (!e.target.textContent) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeTurnTransition();
          e.target.textContent = _gameLogic__WEBPACK_IMPORTED_MODULE_1__["default"].displayMarks(index);
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeMarkColor(e.target);
        }
      }

      if (e.target.classList.contains("reset")) {
        _gameLogic__WEBPACK_IMPORTED_MODULE_1__["default"].resetGame();
      }
    });
  };

  return { clickHandler };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eventHandler);


/***/ }),

/***/ "./src/gameLogic.js":
/*!**************************!*\
  !*** ./src/gameLogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./players */ "./src/players.js");



const gameLogic = (() => {
  const player1 = new _players__WEBPACK_IMPORTED_MODULE_1__["default"].Player("Player X", "X");
  const player2 = new _players__WEBPACK_IMPORTED_MODULE_1__["default"].Player("Player O", "O");
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
    const { gridMarks } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];
    
    gridMarks[i].classList.add("win");
    gridMarks[j].classList.add("win");
    gridMarks[k].classList.add("win");
  };

  const changeTieBgColor = () => {
    const { gridMarks } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];

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
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].gridMarks.forEach((mark) => (mark.textContent = ""));
    counter = 0;
    isWinner = false;
  };

  const clearPlayer = () => {
    currentPlayer = player1.name;
    currentTurn = player1.name;
  };

  const resetGame = () => {
    const { changePlayerEffect, gridMarks } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameLogic);


/***/ }),

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const players = (() => {
  class Player {
    constructor(name, mark) {
      this.name = name;
      this.mark = mark;
    }
  }
  return { Player };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (players);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventHandler */ "./src/eventHandler.js");


_eventHandler__WEBPACK_IMPORTED_MODULE_0__["default"].clickHandler();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdGljdGFjdG9lLy4vc3JjL2V2ZW50SGFuZGxlci5qcyIsIndlYnBhY2s6Ly90aWN0YWN0b2UvLi9zcmMvZ2FtZUxvZ2ljLmpzIiwid2VicGFjazovL3RpY3RhY3RvZS8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL3RpY3RhY3RvZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aWN0YWN0b2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RpY3RhY3RvZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RpY3RhY3RvZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RpY3RhY3RvZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FtZUxvZ2ljIGZyb20gXCIuL2dhbWVMb2dpY1wiO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBncmlkSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLml0ZW1cIik7XG4gIGNvbnN0IGdyaWRNYXJrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFya1wiKTtcbiAgY29uc3QgcGxheWVyVHVybnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnR1cm5cIik7XG4gIGNvbnN0IGJ1dHRvblJlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKTtcbiAgcGxheWVyVHVybnNbMF0uY2xhc3NMaXN0LmFkZChcInR1cm4tdHJhbnNpdGlvblwiKTtcblxuICBjb25zdCBtYXJrQ29sb3IgPSAoY29sb3IsIGVsKSA9PiB7XG4gICAgZWwuc3R5bGUuY29sb3IgPSBgdmFyKC0tJHtjb2xvcn0pYDtcbiAgICBlbC5zdHlsZS50ZXh0U2hhZG93ID0gYDAgMCAxcmVtIHZhcigtLSR7Y29sb3J9KWA7XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlTWFya0NvbG9yID0gKGVsKSA9PiB7XG4gICAgaWYgKGVsLnRleHRDb250ZW50ID09PSBcIlhcIikge1xuICAgICAgbWFya0NvbG9yKFwibGlnaHQtYWNjZW50XCIsIGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFya0NvbG9yKFwic3VjY2Vzc1wiLCBlbCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVBsYXllckVmZmVjdCA9IChwbGF5ZXIxLCBwbGF5ZXIyKSA9PiB7XG4gICAgcGxheWVyVHVybnNbcGxheWVyMV0uY2xhc3NMaXN0LmFkZChgdHVybi10cmFuc2l0aW9uYCk7XG4gICAgcGxheWVyVHVybnNbcGxheWVyMl0uY2xhc3NMaXN0LnJlbW92ZShgdHVybi10cmFuc2l0aW9uYCk7XG4gIH07XG4gIGNvbnN0IGNoYW5nZVR1cm5UcmFuc2l0aW9uID0gKCkgPT4ge1xuICAgIGlmIChnYW1lTG9naWMuZ2V0Q3VycmVudFR1cm4oKSA9PT0gXCJQbGF5ZXIgWFwiKSB7XG4gICAgICBjaGFuZ2VQbGF5ZXJFZmZlY3QoMSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYW5nZVBsYXllckVmZmVjdCgwLCAxKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB7XG4gICAgZ3JpZEl0ZW1zLFxuICAgIHBsYXllclR1cm5zLFxuICAgIGJ1dHRvblJlc2V0LFxuICAgIGdyaWRNYXJrcyxcbiAgICBjaGFuZ2VUdXJuVHJhbnNpdGlvbixcbiAgICBjaGFuZ2VNYXJrQ29sb3IsXG4gICAgY2hhbmdlUGxheWVyRWZmZWN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCBnYW1lTG9naWMgZnJvbSBcIi4vZ2FtZUxvZ2ljXCI7XG5cbmNvbnN0IGV2ZW50SGFuZGxlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtYXJrXCIpKSB7XG4gICAgICAgIGNvbnN0IHsgaW5kZXggfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIGlmICghZS50YXJnZXQudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICBkb20uY2hhbmdlVHVyblRyYW5zaXRpb24oKTtcbiAgICAgICAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9IGdhbWVMb2dpYy5kaXNwbGF5TWFya3MoaW5kZXgpO1xuICAgICAgICAgIGRvbS5jaGFuZ2VNYXJrQ29sb3IoZS50YXJnZXQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyZXNldFwiKSkge1xuICAgICAgICBnYW1lTG9naWMucmVzZXRHYW1lKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgY2xpY2tIYW5kbGVyIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBldmVudEhhbmRsZXI7XG4iLCJpbXBvcnQgZG9tIGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHBsYXllcnMgZnJvbSBcIi4vcGxheWVyc1wiO1xuXG5jb25zdCBnYW1lTG9naWMgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIxID0gbmV3IHBsYXllcnMuUGxheWVyKFwiUGxheWVyIFhcIiwgXCJYXCIpO1xuICBjb25zdCBwbGF5ZXIyID0gbmV3IHBsYXllcnMuUGxheWVyKFwiUGxheWVyIE9cIiwgXCJPXCIpO1xuICBjb25zdCBnYW1lQm9hcmQgPSBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl07XG4gIGxldCBjdXJyZW50UGxheWVyID0gcGxheWVyMS5uYW1lO1xuICBsZXQgY3VycmVudFR1cm4gPSBwbGF5ZXIxLm5hbWU7XG4gIGxldCBjb3VudGVyID0gMDtcbiAgbGV0IGlzV2lubmVyID0gZmFsc2U7XG5cbiAgY29uc3Qgc2V0Q3VycmVudFBsYXllciA9IChwbGF5ZXIpID0+IChjdXJyZW50UGxheWVyID0gcGxheWVyKTtcblxuICBjb25zdCBnZXRDdXJyZW50UGxheWVyID0gKCkgPT4gY3VycmVudFBsYXllcjtcblxuICBjb25zdCBzZXRDdXJyZW50VHVybiA9IChwbGF5ZXIpID0+IChjdXJyZW50VHVybiA9IHBsYXllcik7XG5cbiAgY29uc3QgZ2V0Q3VycmVudFR1cm4gPSAoKSA9PiBjdXJyZW50VHVybjtcblxuICBjb25zdCBjaGFuZ2VXaW5CZ0NvbG9yID0gKGksIGosIGspID0+IHtcbiAgICBjb25zdCB7IGdyaWRNYXJrcyB9ID0gZG9tO1xuICAgIFxuICAgIGdyaWRNYXJrc1tpXS5jbGFzc0xpc3QuYWRkKFwid2luXCIpO1xuICAgIGdyaWRNYXJrc1tqXS5jbGFzc0xpc3QuYWRkKFwid2luXCIpO1xuICAgIGdyaWRNYXJrc1trXS5jbGFzc0xpc3QuYWRkKFwid2luXCIpO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVRpZUJnQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBncmlkTWFya3MgfSA9IGRvbTtcblxuICAgIGdyaWRNYXJrcy5mb3JFYWNoKChtYXJrKSA9PiBtYXJrLmNsYXNzTGlzdC5hZGQoXCJ0aWVcIikpO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSG9yQW5kVmVydCA9IChhcnJheSwgbiwgaiwgaykgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IG4pIHtcbiAgICAgIGNvbnN0IHBsYWNlID1cbiAgICAgICAgYXJyYXlbaV0gPT09IGFycmF5W2kgKyBqXSAmJiBhcnJheVtpICsga10gPT09IGFycmF5W2ldICYmIGFycmF5W2kgKyBqXTtcbiAgICAgIGlmIChwbGFjZSkge1xuICAgICAgICBjaGFuZ2VXaW5CZ0NvbG9yKGksIGogKyBpLCBrICsgaSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0RpYWdvbmFsID0gKGFycmF5LCBpLCBqLCBrKSA9PiB7XG4gICAgY29uc3QgcGxhY2UgPSBhcnJheVtpXSA9PT0gYXJyYXlbal0gJiYgYXJyYXlba10gPT09IGFycmF5W2ldICYmIGFycmF5W2pdO1xuICAgIGlmIChwbGFjZSkge1xuICAgICAgY2hhbmdlV2luQmdDb2xvcihpLCBqLCBrKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja1RpZSA9ICgpID0+IHtcbiAgICBpZiAoY291bnRlciA9PT0gOSAmJiAhaXNXaW5uZXIpIHtcbiAgICAgIGNoYW5nZVRpZUJnQ29sb3IoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja1dpbkNvbmRpdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBjaGVja0hvcml6b250YWwgPSBjaGVja0hvckFuZFZlcnQoZ2FtZUJvYXJkLCAzLCAxLCAyKTtcbiAgICBjb25zdCBjaGVja1ZlcnRpY2FsID0gY2hlY2tIb3JBbmRWZXJ0KGdhbWVCb2FyZCwgMSwgMywgNik7XG4gICAgY29uc3QgY2hlY2tMZWZ0RGlhZ29uYWwgPSBjaGVja0RpYWdvbmFsKGdhbWVCb2FyZCwgMCwgNCwgOCk7XG4gICAgY29uc3QgY2hlY2tSaWdodERpYWdvbmFsID0gY2hlY2tEaWFnb25hbChnYW1lQm9hcmQsIDIsIDQsIDYpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGNoZWNrSG9yaXpvbnRhbCB8fFxuICAgICAgY2hlY2tWZXJ0aWNhbCB8fFxuICAgICAgY2hlY2tMZWZ0RGlhZ29uYWwgfHxcbiAgICAgIGNoZWNrUmlnaHREaWFnb25hbFxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJCb2FyZCA9IChhcnJheSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycmF5W2ldID0gXCJcIjtcbiAgICB9XG4gICAgZG9tLmdyaWRNYXJrcy5mb3JFYWNoKChtYXJrKSA9PiAobWFyay50ZXh0Q29udGVudCA9IFwiXCIpKTtcbiAgICBjb3VudGVyID0gMDtcbiAgICBpc1dpbm5lciA9IGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyUGxheWVyID0gKCkgPT4ge1xuICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXIxLm5hbWU7XG4gICAgY3VycmVudFR1cm4gPSBwbGF5ZXIxLm5hbWU7XG4gIH07XG5cbiAgY29uc3QgcmVzZXRHYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hhbmdlUGxheWVyRWZmZWN0LCBncmlkTWFya3MgfSA9IGRvbTtcbiAgICBjbGVhckJvYXJkKGdhbWVCb2FyZCk7XG4gICAgY2xlYXJQbGF5ZXIoKTtcbiAgICBjaGFuZ2VQbGF5ZXJFZmZlY3QoMCwgMSk7XG4gICAgZ3JpZE1hcmtzLmZvckVhY2goKG1hcmspID0+IHtcbiAgICAgIG1hcmsuY2xhc3NMaXN0LnJlbW92ZShcIndpblwiKTtcbiAgICAgIG1hcmsuY2xhc3NMaXN0LnJlbW92ZShcInRpZVwiKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhbm5vdW5jZUVuZEdhbWUgPSAoKSA9PiB7XG4gICAgaWYgKGNoZWNrV2luQ29uZGl0aW9uKCkpIHtcbiAgICAgIGNvbnN0IHBsYXllcldpbm5lciA9IGdldEN1cnJlbnRQbGF5ZXIoKTtcbiAgICAgIGlzV2lubmVyID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGAke3BsYXllcldpbm5lcn0gd2luc2ApO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc2V0R2FtZSgpO1xuICAgICAgfSwgNTAwKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrVGllKCkpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkl0J3MgYSB0aWVcIik7XG4gICAgICAgIHJlc2V0R2FtZSgpO1xuICAgICAgfSwgNTAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWRkTWFyayA9IChpbmRleCwgcGxheWVyTWFyaywgcGxheWVyLCBuZXh0VHVybikgPT4ge1xuICAgIGdhbWVCb2FyZC5zcGxpY2UoaW5kZXgsIDEsIHBsYXllck1hcmspO1xuICAgIGNvdW50ZXIgKz0gMTtcbiAgICBzZXRDdXJyZW50UGxheWVyKHBsYXllcik7XG4gICAgc2V0Q3VycmVudFR1cm4obmV4dFR1cm4pO1xuICAgIGFubm91bmNlRW5kR2FtZSgpO1xuICAgIHJldHVybiBwbGF5ZXJNYXJrO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlNYXJrcyA9IChpbmRleCkgPT4ge1xuICAgIGlmIChjdXJyZW50VHVybiA9PT0gcGxheWVyMS5uYW1lKSB7XG4gICAgICByZXR1cm4gYWRkTWFyayhpbmRleCwgcGxheWVyMS5tYXJrLCBwbGF5ZXIxLm5hbWUsIHBsYXllcjIubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRNYXJrKGluZGV4LCBwbGF5ZXIyLm1hcmssIHBsYXllcjIubmFtZSwgcGxheWVyMS5uYW1lKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGFkZE1hcmssXG4gICAgZGlzcGxheU1hcmtzLFxuICAgIGdldEN1cnJlbnRUdXJuLFxuICAgIHJlc2V0R2FtZSxcbiAgICBjdXJyZW50VHVybixcbiAgICBjdXJyZW50UGxheWVyLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUxvZ2ljO1xuIiwiY29uc3QgcGxheWVycyA9ICgoKSA9PiB7XG4gIGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgbWFyaykge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMubWFyayA9IG1hcms7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IFBsYXllciB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVycztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGV2ZW50SGFuZGxlciBmcm9tIFwiLi9ldmVudEhhbmRsZXJcIjtcblxuZXZlbnRIYW5kbGVyLmNsaWNrSGFuZGxlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9