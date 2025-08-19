# Photo Tagger (Where's Waldo)

a recreation of where's waldo. It includes a busy photo where the user is meant to find certain elements and be given feedback based on if they have found the correct element or not.

## Tasks

- Display a photo and identify the location(pixel position) of the elements that need to be found.
- Upon selecting any element, whether it's the correct one or not, a targeting box should be placed around the portion of the photo that the user clicked and should display a list of possible characters
- should confirm with the backend if the correct character was selected:
  - if correct, a marker should be placed in the location clicked
  - if incorrect an error message should display and/or turn the targeting box red then remove targeting box.
- log the time from when the photo loads to when the final character is found.
- once complete collect users name and record the time.

## Frontend

- display a busy photo
- accurately track and collect pointer position on click
  - find a way to normalize coordinates across different screen sizes
- on click display list of possible characters for the user to click (form)
- send _x_ and _y_ coords along with selected character to backend.
- show if correct answer was picked or not. leave a marker on a character if correct.
- user will then find next character.

## Backend

- handles timer for scoring starting from when photo loads.
- validates character location with user selection
- store coordinates of characters on the image

## DB
- record player names and completion times

### Schema:

scores:

- user name or initials
- round duration.
