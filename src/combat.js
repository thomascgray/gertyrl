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
