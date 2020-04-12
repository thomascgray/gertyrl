export const handlePropCollision = (prop) => {
  if (prop.type === "container") {
    addToLog(`you open up the ${prop.name}`);
    blockMovement = true;
    openContainer = prop;

    updateContainer = (callback) => {
      const updatedContainer = callback(prop);
      openContainer = updatedContainer;
      battlemap = battlemap;
    };
  } else {
    openContainer = undefined;
  }
  if (prop && prop.type === "stairs_up") {
    setTimeout(() => {
      unloadBattlemap(battlemap);
    }, 200);
  }
};

const handleMobCollision = (mob) => {};

export const isPlayerDead = (player) => {
  if (player.currentHp <= 0) {
    return true;
  }

  return false;
};
