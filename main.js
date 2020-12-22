//declare flipcarf to check if it is the first select or the second
const card = $(".memory-card");
//card options
const cardArray = [
  { name: 2, img: "" },
  { name: 2, img: "" },
  { name: 5, img: "" },
  { name: 5, img: "" },
  { name: 7, img: "" },
  { name: 7, img: "" },
  { name: 1, img: "" },
  { name: 1, img: "" },
  { name: 3, img: "" },
  { name: 3, img: "" },
  { name: 4, img: "" },
  { name: 4, img: "" },
  { name: 6, img: "" },
  { name: 6, img: "" },
  { name: 8, img: "" },
  { name: 8, img: "" },
];
let card_chosen = [];
let card_Id = [];
const Correct = [];
//score-panel
const moveCounter = $("#moveCounter");
let movesCount = 0;
let winCount = 0;
let loseCount = 0;
let timer = 0;

//start game
const overlay = $(".overlay");
overlay.click(function () {
  overlay.removeClass("visible");
  timer = setInterval(updateCountDown, 1000);
});

//timer
let time = 1.0 * 60;
const countDown = document.querySelector("#timer");
const updateCountDown = function () {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  countDown.innerHTML = "Time: " + minutes + ":" + seconds;
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

const shuffled = cardArray.sort(() => Math.random() - 0.5);
const back_card = $(".back-card");
for (i = 0; i < cardArray.length; i++) {
  back_card[i].innerHTML = cardArray[i].name; //img
  card[i].setAttribute("id", i);
}

//flip card --> movesCount
const flipCard = card.click(function () {
  const currentCard = event.target;
  const card_id = $(currentCard).parents(currentCard).attr("id");
  card_Id.push(card_id);
  card_chosen.push(cardArray[card_id].name);
  $(currentCard).addClass("flip");
  movesCount += 1;
  $(moveCounter).text(movesCount);
  //$("#" + card_Id).unbind("click");
  if (card_chosen.length === 2) {
    // $(card).unbind("click");
    setTimeout(check_Matching, 500);
  }
  console.log(card_chosen);
});
//matching card
function check_Matching() {
  if (card_chosen[0] === card_chosen[1]) {
    Correct.push(card_chosen[0]);
    Correct.push(card_chosen[1]);
    //change img
    //cards[optionOneId].setAttribute("src", "images/blank.png");
    //removeEventListener
    $("#" + card_Id[0]).unbind("click");
    $("#" + card_Id[1]).unbind("click");
    done = (Correct.length / cardArray.length) * 100;
    procress_bar();
    if (cardArray.length === Correct.length) {
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
  //message && stars && restart button && win count
  clearInterval(timer);
  statrsRate(movesCount);
  console.log("win");
}
// lose --> call win time is up
function lose() {
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
