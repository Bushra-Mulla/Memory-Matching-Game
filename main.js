//declare flipcarf to check if it is the first select or the second
const card = $(".front-card");
const cards = [0, 0, 1, 1, 2, 5, 3, 2, 3];
const moveCounter = $("#moveCounter");
let hasFlippedcard = false;
let firstCard = "";
let secondCard = "";
let moves = 0;

//start game
const overlay = $(".overlay");
overlay.click(function () {
  overlay.removeClass("visible");
  setInterval(updateCountDown, 1000);
});

//timer
let time = 1.5 * 60;
const countDown = document.querySelector("#timer");
const updateCountDown = function () {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  countDown.innerHTML = minutes + ":" + seconds;
  time--;
};
//progress-bar
const progress = $(".progress_done");
$(progress).css("width", $(progress).attr("data_done") + "%");
//$(progress).text("0%");

//function for flipCard
card.click(function () {
  const currentCard = event.target;
  // to show ar hide the card
  $(currentCard).addClass("flip");
  if (hasFlippedcard == false) {
    firstCard = $(currentCard).text();
    hasFlippedcard = true;
  } else {
    secondCard = $(currentCard).text();
    hasFlippedcard = false;
    moveCounter.text("move: " + (moves += 1));
  }
  console.log(firstCard);
  console.log(secondCard);

  //get selections and check if it's matches
  if (firstCard === secondCard) {
    $(currentCard).unbind("click");
    $(firstCard).removeClass("flip");

    // $(currentCard).removeClass("flip");
  } else {
    //secondCard.removeClass("flip");
    $(firstCard).removeClass("flip");
    // secondCard.classList.remove("flip");
  }
});

// matched / unmatched
const matched = function () {
  //.addClass
  //enable cards and disable matched cards
};
const unmatched = function (card) {};

//shuffle cards
const shuffle = function (cards) {
  let index = cards.length;
  let randomIndex, temporaryValue;
  while (index !== 0) {
    randomIndex = Math.floor(Math.random() * index);
    index -= 1;
    temporaryValue = cards[index];
    cards[index] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
  card.text(cards[index]);

  return cards;
};
console.log(shuffle(cards));
shuffle(cards);

//stars rate
const statrsRate = function (moves) {
  if (moves > 8 && moves < 12) {
    //show stars 3
  } else if (moves > 13) {
    //show stars 1
  }
};

// win / lose
