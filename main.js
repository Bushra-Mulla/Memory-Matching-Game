//declare flipcarf to check if it is the first select or the second
const card = $(".memory-card");
//const cards = [...card];
//card options
const cardArray = [
  { name: 2, img: "" },
  { name: 2, img: "" },
  { name: 5, img: "" },
  { name: 5, img: "" },
  { name: 7, img: "" },
  { name: 7, img: "" },
];
const moveCounter = $("#moveCounter");
let hasFlippedcard = false;
let card_chosen = [];
const Correct = [];
let moves = 0;
let timer = 0;

//start game
const overlay = $(".overlay");
overlay.click(function () {
  overlay.removeClass("visible");
  timer = setInterval(updateCountDown, 1000);
});

//timer
let time = 0.1 * 60;
const countDown = document.querySelector("#timer");
const updateCountDown = function () {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  countDown.innerHTML = "Time: " + minutes + ":" + seconds;
  time--;
  if (time < 0) {
    clearInterval(timer);
    //call f lose
  }
};
//progress-bar
const progress = $(".progress_done");
$(progress).css("width", $(progress).attr("data_done") + "%");
//$(progress).text("0%");

//stars rate --> //cole in win
const statrsRate = function (moves) {
  if (moves > 8 && moves < 12) {
    //show stars 3
  } else if (moves > 13) {
    //show stars 1
  }
};

// win --> check if all cards are open
// lose --> call win time is up

//shuffle cards
const shuffled = cardArray.sort(() => Math.random() - 0.5);
const back_card = $(".back-card");
for (i = 0; i < cardArray.length; i++) {
  back_card[i].innerHTML = cardArray[i].name; //img
  card[i].setAttribute("data-id", i);
  console.log(card[i]);
}

//flip card --> moves
card.click(function () {
  const currentCard = event.target;
  const card_id = $(currentCard).parents(currentCard).attr("data-id");
  console.log(card_id);
  card_chosen.push(cardArray[card_id].name);
  $(currentCard).addClass("flip");
  if (card_chosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
  console.log(card_chosen);
});
//matching card

//restart
