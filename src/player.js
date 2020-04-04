export class CPlayer {
  constructor() {
    this.name = "Tim";
    this.race = {
      name: "Human"
    };
    this.profession = {
      name: "Enchanter"
    };
    this.skills = ["skill"];
    this.xp = 0;
    this.position = [1, 1];
    this.worldPosition = [3, 3];
    this.inventory = [];
    this.quests = [];
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
