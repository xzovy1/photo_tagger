import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
let start, elapsedTime;
let roundInProgress = false;

app.get("/api/start", (req, res) => {
  if (!roundInProgress) {
    start = new Date().toTimeString();
    roundInProgress = true;
    res.json({ message: `Timer started at ${start}` });
  } else {
    res.json({ message: "Unable to start timer with round in progress" });
  }
});

app.get("/api/stop", (req, res) => {
  elapsedTime = new Date() - new Date(start);
  res.json({ message: `Timer after ${elapsedTime} ms`, elapsedTime });
});

app.post("/api/submitScore", (req, res) => {
  const { name } = req.body;
  //post name and elapsed time to server
  res.json({
    message: `Score submitted for ${name} with time ${elapsedTime} ms`,
  });
});

app.post("/api/validateCoordinates", (req, res) => {
  const { x, y, imageWidth, imageHeight } = req.body;
  const xRatio = x / imageWidth;
  const yRatio = y / imageHeight;
  // Validate coordinates (dummy validation for example)
  //
  if (x < 0 || y < 0) {
    return res.status(400).json({ message: "Invalid coordinates" });
  }
  res.json({ message: "Coordinates are valid" });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
