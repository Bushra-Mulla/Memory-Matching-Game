# Memory Matching Game

The memory game is a basic matching game to test the player's ability to memorize cards’ places and match the identical pairs successfully

## How The Game Works

The game board consists of sixteen cards. The deck is made up of eight different pairs of cards, which are arranged randomly on the board.

### Game behavior

- The player can flip two cards at the same time.
- The card will by remain open if those two cards match
- If the cards ate not a match, both cards will be flipped back to their original face down state.
- If all pairs have been correctly matched before the time is up then the player wins

## Getting Started

Access to the [Game](https://pages.git.generalassemb.ly/bushra-mulla/Memory-Matching-Game/)

## Technologies Used In The Project

- JavaScript
- HTML
- CSS
- jQuery library

## wireframes

![wireframes](./img/whireframes.png)

## Demo

![Web Page](./img/web.gif)

## User Stories

- As a user, I should be able to start a new memory matching game.
- As a user, I should be able to click on the cards sequentially. For example, flipping the first card then the second card, and so on.
- As a user, I should be shown the cards that have been correctly matched and the count of total moves.
- As a user, I should not be able to click on the same card twice.
- As a user, I should be shown a message when I win/lose.
- As a user, I should not be able to continue playing once I win/lose.
- As a user, I should be able to play the game again without refreshing the page.
- As a user, I should be able to view the result achieved.

## Project Plan

It's very important to plan your project before you start writing the code, and think about what you are going to build

- Started first by writing the requirements of the game
- Wrote the process / flow the code
- Created an HTML file
- After that, I began working on the basic design using CSS.
- Then shifted to writing pseudocode for the logic of the game following the process that I’ve written before and made the functions interconnected
- In the real code, I worked with the card flipping because all the other functions are connected to it, thus I can test the game flow
- Then I thought about ways to shuffle the cards to make it random
- Worked on how the game would recognize the winner by matching the card selector and check if it's matching
- After that, started working on score panel that shows the progress of the game.
- Last step was to make the function that reset the game and save the result achieved by the player (loss or win).

## Future updates to project

- Allow 2 players to play against each other, and can play online
- Make difficulty levels from easy to hard, so the player can choose
