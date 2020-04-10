import { DIRECTIONS } from "./config.js";

export const playerLunge = (direction) => {
  const playerWrapper = document.querySelector("[data-id=player-div]");

  switch (direction) {
    case DIRECTIONS.UP:
      playerLungeUp(playerWrapper);
      break;
    case DIRECTIONS.DOWN:
      playerLungeDown(playerWrapper);
      break;
    case DIRECTIONS.LEFT:
      playerLungeLeft(playerWrapper);
      break;
    case DIRECTIONS.RIGHT:
      playerLungeRight(playerWrapper);
      break;
  }
};

export const animateElement = (
  element,
  styleProperty,
  originalValue,
  newValue
) => {
  element.style[styleProperty] = newValue;
  setTimeout(() => {
    element.style[styleProperty] = originalValue;
  }, 100);
};

export const playerLungeUp = (playerWrapper) => {
  animateElement(
    playerWrapper,
    "top",
    playerWrapper.style.top,
    String(parseInt(playerWrapper.style.top) - 30) + "px"
  );
};

export const playerLungeDown = (playerWrapper) => {
  animateElement(
    playerWrapper,
    "top",
    playerWrapper.style.top,
    String(parseInt(playerWrapper.style.top) + 30) + "px"
  );
};

export const playerLungeLeft = (playerWrapper) => {
  animateElement(
    playerWrapper,
    "left",
    playerWrapper.style.left,
    String(parseInt(playerWrapper.style.left) - 30) + "px"
  );
};

export const playerLungeRight = (playerWrapper) => {
  animateElement(
    playerWrapper,
    "left",
    playerWrapper.style.left,
    String(parseInt(playerWrapper.style.left) + 30) + "px"
  );
};
