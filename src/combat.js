export const meleeHit = (player, mob, addToLog) => {
  const damage = 2;
  mob.hp = mob.hp - damage;
  addToLog(`you dealt ${damage} damage`);
  if (mob.hp <= 0) {
    mob.healthStatus = "dead";
    addToLog(`you killed the mob!`);
  }

  return mob;
};

export const mobHitPlayer = (
  mob,
  player,
  addToLog,
  updatePlayer,
  onPlayerDeath
) => {
  updatePlayer((player) => {
    player.currentHp = player.currentHp - 2;
  });

  addToLog(`the mob hit you for 2 damage`);

  if (player.currentHp <= 0) {
    console.log("on player detah");
    onPlayerDeath();
  }

  return {
    mob,
    player,
  };
};
