import { DIRECTIONS } from "./config.js";

export const mobLunge = (mobUuid, direction) => {
  const mobWrapper = document.querySelector(`[data-id=mob-${mobUuid}-div]`);
  domElementLunge(mobWrapper, direction);
};

export const playerLunge = (direction) => {
  const playerWrapper = document.querySelector("[data-id=player-div]");
  domElementLunge(playerWrapper, direction);
};

export const domElementLunge = (domElement, direction) => {
  switch (direction) {
    case DIRECTIONS.UP:
      domElementLungeUp(domElement);
      break;
    case DIRECTIONS.DOWN:
      domElementLungeDown(domElement);
      break;
    case DIRECTIONS.LEFT:
      domElementLungeLeft(domElement);
      break;
    case DIRECTIONS.RIGHT:
      domElementLungeRight(domElement);
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

export const domElementLungeUp = (domElement) => {
  animateElement(
    domElement,
    "top",
    domElement.style.top,
    String(parseInt(domElement.style.top) - 30) + "px"
  );
};

export const domElementLungeDown = (domElement) => {
  animateElement(
    domElement,
    "top",
    domElement.style.top,
    String(parseInt(domElement.style.top) + 30) + "px"
  );
};

export const domElementLungeLeft = (domElement) => {
  animateElement(
    domElement,
    "left",
    domElement.style.left,
    String(parseInt(domElement.style.left) - 30) + "px"
  );
};

export const domElementLungeRight = (domElement) => {
  animateElement(
    domElement,
    "left",
    domElement.style.left,
    String(parseInt(domElement.style.left) + 30) + "px"
  );
};
