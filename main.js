//game audio
bgMusic = new Audio("audio/bgMusic.mp3");
correct_Audio = new Audio("audio/correct-audio.mp3");
flip_Audio = new Audio("audio/flip-audio.mp3");
lose_Audio = new Audio("audio/lose-audio.mp3");
win_Audio = new Audio("audio/win-audio.mp3");

//declare flipcarf to check if it is the first select or the second
const card = $(".memory-card");
//card options
const cardArray = [
  { name: 1, img: "img/1.jpg" },
  { name: 2, img: "img/2.jpg" },
  { name: 3, img: "img/3.jpg" },
  { name: 4, img: "img/4.jpg" },
  { name: 5, img: "img/5.jpg" },
  { name: 6, img: "img/6.jpg" },
  { name: 7, img: "img/7.jpg" },
  { name: 8, img: "img/8.jpg" },
  { name: 1, img: "img/1.jpg" },
  { name: 2, img: "img/2.jpg" },
  { name: 3, img: "img/3.jpg" },
  { name: 4, img: "img/4.jpg" },
  { name: 5, img: "img/5.jpg" },
  { name: 6, img: "img/6.jpg" },
  { name: 7, img: "img/7.jpg" },
  { name: 8, img: "img/8.jpg" },
];
let card_chosen = [];
let card_Id = [];
let match = [];
//score-panel
const moveCounter = $("#moveCounter");
let movesCount = 0;
let winCount = 0;
let loseCount = 0;
let timer = 0;

//start game
const start = $("#start").click(function () {
  $("#start").removeClass("visible");
  shuffleCard(cardArray);
  bgMusic.play();
  timer = setInterval(updateCountDown, 1000);
});

//timer
let time = 61.0 * 60;
const countDown = $("#timer");
const updateCountDown = function () {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  $(countDown).text("Time: " + minutes + ":" + seconds);
  time--;
  if (time < 0) {
    clearInterval(timer);
    //call f lose
    lose();
  }
};
//progress-bar
let done = 0;
const progress = $(".progress_done");
function procress_bar() {
  $(progress).attr("data_done", done);
  $(progress).css("width", $(progress).attr("data_done") + "%");
  $(progress).text($(progress).attr("data_done") + "%");
}
//shuffle cards
function shuffleCard(cardArray) {
  const shuffled = cardArray.sort(() => Math.random() - 0.5);
  const back_card = $(".back-card");
  for (i = 0; i < cardArray.length; i++) {
    back_card[i].src = cardArray[i].img; //img
    card[i].setAttribute("id", i);
  }
}
//flip card --> movesCount
const flipCard = card.on("click", function () {
  flip_Audio.play();
  const currentCard = event.target;
  const card_id = $(currentCard).parents(currentCard).attr("id");
  card_Id.push(card_id);
  card_chosen.push(cardArray[card_id].name);
  $(currentCard).addClass("flip");
  movesCount += 1;
  $(moveCounter).text("move: " + movesCount);
  //$("#" + card_Id).off("click");
  if (card_chosen.length === 2) {
    // $(card).unbind("click");
    setTimeout(check_Matching, 500);
  }

  console.log(card_chosen);
});
//matching card
function check_Matching() {
  if (card_chosen[0] === card_chosen[1]) {
    correct_Audio.play();
    match.push(card_chosen[0]);
    match.push(card_chosen[1]);
    //removeEventListener
    $("#" + card_Id[0]).unbind("click");
    $("#" + card_Id[1]).unbind("click");
    done = (match.length / cardArray.length) * 100;
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
  }
  card_chosen = [];
  card_Id = [];
}
// win --> check if all cards are open
function win() {
  win_Audio.play();
  //message && stars && restart button && win count
  $("#win").addClass("visible");
  clearInterval(timer);
  statrsRate(movesCount);
  winCount += 1;
  console.log("win");
}
// lose --> call win time is up
function lose() {
  lose_Audio.play();
  $("#lose").addClass("visible");
  loseCount += 1;
  //message && restart button && lose count
  console.log("lose");
}
//stars rate --> //cole in win
const statrsRate = function (movesCount) {
  if (movesCount > 8 && movesCount < 12) {
    //show stars 3
    console.log(3);
  } else if (movesCount > 13) {
    //show stars 1
    console.log(1);
  }
};

//restart

$("#resetGame").on("click", function () {
  console.log("mmmmmmmmmmmmm");

  clearInterval(timer);
  movesCount = 0;
  match = [];
  $(moveCounter).text("move: " + movesCount);
  shuffleCard(cardArray);
  time = 1.0 * 60;
  timer = setInterval(updateCountDown, 1000);
  $(".flip").removeClass("flip");
});
