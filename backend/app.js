import express from "express";
import "dotenv/config";
import cors from "cors";
import multer from "multer";
import prisma from "./prisma/client.js";
import characters from "./characterLocations.js";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//using multer instead of setting content-type to x-www-form-urlencoded in fetch
//use upload.none() middleware for forms 
//https://stackoverflow.com/questions/37630419/how-to-handle-formdata-from-express-4
const upload = multer();

let start = undefined;
let roundInProgress = false;
let remaining = characters.map((character) => { return { name: character.name, located: character.located, id: character.id } });

console.log(remaining)

app.get("/api/scoreboard", async (req, res) => {
  const highScores = await prisma.scoreBoard.findMany({
    orderBy: {
      score: 'asc'
    },
    take: 5
  });
  return res.json({ highScores })
})

app.get("/api/start", (req, res) => {
  roundInProgress = false;

  if (!roundInProgress) {
    start = new Date();
    roundInProgress = true;
    res.json({
      message: `Timer started at ${start.toLocaleTimeString()}`,
      roundInProgress,
      remaining
    });
  } else {
    res.json({
      message: "Unable to start timer with round in progress",
      roundInProgress,
    });
  }
});

app.post("/api/complete", upload.none(), async (req, res) => {
  const { name } = req.body;
  if (remaining.length == 0) {
    let elapsedTime = (new Date() - start) / 1000;
    roundInProgress = false;
    start = undefined;
    remaining = characters.map((character) => { return { name: character.name, located: character.located, id: character.id } });
    await prisma.scoreBoard.create({
      data: {
        name,
        score: elapsedTime
      }
    })
    console.log(remaining)
    return res.json({
      message: `Score submitted for ${name} with time ${elapsedTime} ms`,
      elapsedTime,
      remaining
    });
  } else {

    return res.json({ remaining });
  }
});

app.get("/api/remaining", (req, res) => {
  return res.json({ remaining })
})

// validate character name and location
app.post("/api/validate", upload.none(), (req, res) => {
  const { x, y, width, height, characterName } = req.body;

  function round(value1, value2) {
    let number = (parseFloat(value1) / parseFloat(value2)) * 100;
    console.log(value1, value2)
    return number;
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
  console.log((Math.abs(selected.x - xRatio)), Math.abs(selected.y - yRatio))
  if (Math.abs(selected.x - xRatio) <= 1.4 && Math.abs(selected.y - yRatio) <= 1.4) {
    console.log(`${selected.name} found`);
    remaining = characters.reduce((results, character) => {
      if (character.name === characterName) {
        character.located = true;
      } else if (!character.located && character.name !== characterName) {
        results.push({ name: character.name, id: character.id, located: character.located });
      }
      return results;
    }, []);
    console.log(remaining)
    return res.json({
      valid: true,
      message: `${selected.name} found!`,
      remaining,
    });
  } else {
    console.log(`${selected.name} is not there`);
    return res.json({ message: `${selected.name} is not there`, valid: false });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
