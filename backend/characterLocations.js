const characters = [
  { name: "Waldo", x: 16, y: 84, id: 0 },
  { name: "Wizard Whitebeard", x: 28, y: 13, id: 1 },
  { name: "Wenda", x: 75, y: 76, id: 2, },
  { name: "Odlaw", x: 86, y: 82, id: 3, },
  { name: "Woof", x: 61, y: 70, id: 4, },
];

characters.map((character) => (character.located = false));

export default characters;
