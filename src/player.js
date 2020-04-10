export class CPlayer {
  constructor() {
    this.maxHp = 10;
    this.currentHp = 10;
    this.name = "Tim";
    this.race = {
      name: "Human",
    };
    this.profession = {
      name: "Enchanter",
    };
    this.skills = ["skill"];
    this.xp = 0;
    this.position = [1, 1];
    this.worldPosition = [3, 3];
    this.inventory = [
      {
        name: "sword",
        sprite: "sword",
      },
    ];
    this.quests = [];
    this.attributes = {
      muscle: 5,
      reflex: 5,
      mind: 5,
      cunning: 5,
    };
  }

  addXp(amount) {
    this.xp += amount;
  }

  addToInventory(itemName) {
    this.inventory.push(itemName);
  }

  removeFromInventory(itemName) {
    this.inventory.splice(this.inventory.indexOf(itemName), 1);
  }
}
