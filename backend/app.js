import express from "express";
import "dotenv/config";
import cors from "cors";
import multer from "multer";
import characters from "./characterLocations.js";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//using multer instead of setting content-type to x-www-form-urlencoded in fetch
//https://stackoverflow.com/questions/37630419/how-to-handle-formdata-from-express-4
const upload = multer();

let start;
let roundInProgress = false;
let remaining = characters.map((character) => character.name);
remaining = [];

app.get("/api/start", (req, res) => {
  if (!roundInProgress) {
    start = new Date();
    roundInProgress = true;
    res.json({ message: `Timer started at ${start.toLocaleTimeString()}` });
  } else {
    res.json({ message: "Unable to start timer with round in progress" });
  }
});

app.post("/api/complete", (req, res) => {
  const { name } = req.body;
  if (remaining.length == 0) {
    let elapsedTime = (new Date() - start) / 1000;
    return res.json({
      message: `Score submitted for ${name} with time ${elapsedTime} ms`,
      elapsedTime,
    });
  } else {
    return res.json({ message: JSON.stringify(remaining) });
  }
});

// validate character name and location
app.post("/api/validate", upload.none(), (req, res) => {
  const { x, y, width, height, characterName } = req.body;

  function round(value1, value2) {
    let number = (parseFloat(value1) / parseFloat(value2)) * 100;
    return Math.floor(number);
  }
  const xRatio = round(x, width);
  const yRatio = round(y, height);

  const selected = characters.find((character) => {
    if (character.name === characterName) {
      return character.name;
    }
  });

  if (x < 0 || y < 0 || Number.isNaN(xRatio) || Number.isNaN(yRatio)) {
    return res.status(400).json({ message: "Invalid coordinates" });
  }
  if (selected.x == xRatio && selected.y == yRatio) {
    console.log(`${selected.name} found`);
    remaining = characters.reduce((results, character) => {
      if (character.name === characterName) {
        character.located = true;
      } else {
        results.push(character.name);
      }
      return results;
    }, []);
    return res.json({
      message: `${selected.name} found!`,
      remaining: `${JSON.stringify(remaining)}`,
    });
  } else {
    console.log(`${selected.name} is not there`);
    return res.json({ message: `${selected.name} is not there` });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
