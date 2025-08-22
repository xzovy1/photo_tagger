const characters = [
  { name: "Waldo", x: 16, y: 84 },
  { name: "Wizard Whitebeard", x: 28, y: 13 },
  { name: "Wenda", x: 75, y: 76 },
  { name: "Odlaw", x: 86, y: 82 },
  { name: "Woof", x: 61, y: 70 },
];

characters.map((character) => (character.located = false));

export default characters;
