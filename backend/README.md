# Backend

## Scope

handles:

- duration of round
- validation for _x_ and _y_ coordinates of selected location of characters
  - since the coords of characters are static, they don't need to be in the DB
- receive player name info. Pass name and duration to DB.

## Routes

`/api/start`:
submit start time to server

## DB

## Tables

#### players

- player name (string)
- game duration (int)

## Image normalization

- backend receives the width and height of the image and x and y coords of the character.
- there should be a consistent ratio of x and y to width and height.
