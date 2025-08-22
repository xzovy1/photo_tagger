class Character {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.located = false;
  }
}

const waldo = new Character("Waldo", 16, 84);
const wizard = new Character("Wizard Whitebeard", 28, 13);
const wenda = new Character("Wenda", 75, 76);
const odlaw = new Character("Odlaw", 86, 82);
const woof = new Character("Woof", 61, 70);

export const characters = [waldo, wizard, wenda, odlaw, woof];
