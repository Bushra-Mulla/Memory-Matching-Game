const bgMusic = new Audio("./audio/bgMusic.mp3");
const correct_Audio = new Audio("./audio/correct-audio.mp3");
const flip_Audio = new Audio("./audio/flip-audio.mp3");
const lose_Audio = new Audio("./audio/lose-audio.mp3");
const win_Audio = new Audio("./audio/win-audio.mp3");
const card_chosen = []; //selector
const card_Id = []; //selector_Id
const match = [];
const cardArray = [
  { name: 1, img: "./img/1.jpg" },
  { name: 2, img: "./img/2.jpg" },
  { name: 3, img: "./img/3.jpg" },
  { name: 4, img: "./img/4.jpg" },
  { name: 5, img: "./img/5.jpg" },
  { name: 6, img: "./img/6.jpg" },
  { name: 7, img: "./img/7.jpg" },
  { name: 8, img: "./img/8.jpg" },
  { name: 1, img: "./img/1.jpg" },
  { name: 2, img: "./img/2.jpg" },
  { name: 3, img: "./img/3.jpg" },
  { name: 4, img: "./img/4.jpg" },
  { name: 5, img: "./img/5.jpg" },
  { name: 6, img: "./img/6.jpg" },
  { name: 7, img: "./img/7.jpg" },
  { name: 8, img: "./img/8.jpg" },
]; //card options
const moveCounter = $("#moveCounter");
const card = $(".memory-card");
const countDown = $("#timer");
const progress = $(".progress_done");
let time = 0;
let movesCount = 0;
let winCount = 0;
let loseCount = 0;
let timer = 0;
let done = 0;

//start game
$("#start").on("click", start);
function start() {
  $("#start").removeClass("visible");
  shuffleCard(cardArray);
  bgMusic.play();
  time = 1.0 * 60;
  timer = setInterval(updateCountDown, 1000);
}

//timer
function updateCountDown() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  $(countDown).text("Time: " + minutes + ":" + seconds);
  time--;
  if (time < 0) {
    clearInterval(timer);
    lose();
  }
}

function procress_bar() {
  done = (match.length / cardArray.length) * 100;
  $(progress).attr("data_done", done);
  $(progress).css("width", $(progress).attr("data_done") + "%");
  $(progress).text($(progress).attr("data_done") + "%");
}

function shuffleCard(cardArray) {
  cardArray = cardArray.sort(() => Math.random() - 0.5);
  const back_card = $(".back-card");
  for (i = 0; i < cardArray.length; i++) {
    back_card[i].src = cardArray[i].img; //img
    card[i].setAttribute("id", i);
  }
}
//flip card --> movesCount
card.on("click", flipCard);

function flipCard() {
  if (card_chosen.length === 2) {
    return;
  }
  flip_Audio.play();
  const currentCard = event.target;
  const card_id = $(currentCard).parents(currentCard).attr("id");
  card_Id.push(card_id);
  card_chosen.push(cardArray[card_id].name);
  $(currentCard).addClass("flip");
  $("#" + card_id).unbind("click");

  if (card_chosen.length === 2) {
    movesCount += 1;
    $(moveCounter).text("move: " + movesCount);
    statrsRate();
    setTimeout(check_Matching, 500);
  }
  console.log(card_chosen);
}
//matching card
function check_Matching() {
  if (card_chosen[0] === card_chosen[1]) {
    correct_Audio.play();
    match.push(card_chosen[0]);
    match.push(card_chosen[1]);
    procress_bar();
    if (cardArray.length === match.length) {
      win();
    }
  } else {
    $("#" + card_Id[0])
      .children()
      .removeClass("flip");
    $("#" + card_Id[1])
      .children()
      .removeClass("flip");

    $("#" + card_Id[0]).on("click", flipCard);
    $("#" + card_Id[1]).on("click", flipCard);
  }
  card_chosen.length = 0;
  card_Id.length = 0;
}
// win --> check if all cards are open
function win() {
  win_Audio.play();
  //message && stars && restart button && win count
  $("#win").addClass("visible");
  clearInterval(timer);
  statrsRate();
  winCount += 1;
  $("#winer").text("win: " + winCount);
  card.unbind("click", flipCard);
}
// lose --> call win time is up
function lose() {
  lose_Audio.play();
  $("#lose").addClass("visible");
  loseCount += 1;
  $("#loser").text("lose: " + loseCount);
  card.unbind("click", flipCard);
}

//stars rate --> //cole in win
function statrsRate() {
  if (movesCount <= 12) {
    $("#stars").children().text("★");
  } else if (movesCount > 12 && movesCount < 15) {
    $("#star3").text("☆");
  } else if (movesCount > 15) {
    $("#star2").text("☆");
  }
}

$(".resetGame").on("click", restart);
function restart() {
  //reset the timer/moves/priogress/shiffle/flip
  clearInterval(timer);
  movesCount = 0;
  start();
  $(moveCounter).text("moves: " + movesCount);
  card_chosen.length = 0;
  card_Id.length = 0;
  match.length = 0;
  statrsRate();
  procress_bar();
  $(".flip").removeClass("flip");
  $(".visible").removeClass("visible");
  card.unbind("click", flipCard);
  card.on("click", flipCard);
}
