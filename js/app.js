// number of cards opened
let openCards = [];

// count of total matched cards
let matchedCards = 0;
let timerFlag = true;
let moves = 0;
let restart = document.querySelector(".fa-repeat")
let starsCount = document.querySelector(".stars");
let deck = document.querySelector(".deck");

/*
 * Create a list that holds all of your cards
 */
let cardsArray = ["fa fa-diamond", 
"fa fa-paper-plane-o", 
"fa fa-anchor", 
"fa fa-bolt", 
"fa fa-cube", 
"fa fa-leaf", 
"fa fa-bicycle", 
"fa fa-bomb", 
"fa fa-diamond", 
"fa fa-paper-plane-o", 
"fa fa-anchor", 
"fa fa-bolt", 
"fa fa-cube", 
"fa fa-leaf", 
"fa fa-bicycle", 
"fa fa-bomb"];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffleCards();
startTimer();

// resets the game
restart.addEventListener('click', function(event) {
  moves = 0;
  matchedCards = 0;
  openCards = [];
  deck.innerHTML = " ";
  document.querySelector(".moves").innerHTML = 0;
  resetTimer();
  resetStars();
  shuffleCards();
});

//shuffles the cards and appends to deck
function shuffleCards() {
  const shuffledCardsArray = shuffle(cardsArray);
  for (let i = 0; i< shuffledCardsArray.length; i++){
    let card = document.createElement("li");
    card.classList.add("card");
    deck.appendChild(card);
    card.innerHTML = `<i class='${shuffledCardsArray[i]}'></i>`;
  }
}

//timer start function
function startTimer() {
   if(timerFlag) {
     let timer = document.querySelector(".timer").innerHTML;
     let timeArray = timer.split(":");
     let min = parseInt(timeArray[0]);
     let sec = parseInt(timeArray[1]);
     if (sec === 59){
       min++;
       sec = 0;
     }
     else {
       sec++;
     }
     if(sec < 10){
       sec = "0" + sec;
     }    
    document.querySelector(".timer").innerHTML = min + ":" + sec;
    setTimeout(startTimer, 1000);
   }
}

// resets the timer
function resetTimer() {
  document.querySelector(".timer").innerHTML = "00:00";
}

// pause and plays the timer
function changeStateTimer() {
  if(timerFlag == false) {
    timerFlag = true;
    startTimer();
  }
  else {
    timerFlag = false; 
  }
}

// listens to the mouse clicks                   
deck.addEventListener("click", function(event) {
  let target = event.target;
  if(target.classList.contains("card") && openCards.length < 2) {
    toggleClass(target);
    openCards.push(target);
    if(openCards.length === 2){
      matchStatus();
      incrementMove();
    }
  }
});


// toggle the class on clicked card
function toggleClass(target) { 
  target.classList.toggle("show");
  target.classList.toggle("open");
}

// checks the card similarity in opencards array.
function matchStatus(){
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    openCards[0].classList.toggle("match");
    openCards[1].classList.toggle("match");
    openCards = [];
    matchedCards++;
  } 
  else {
    setTimeout(function() {
      toggleClass(openCards[0]);
      toggleClass(openCards[1]);
      openCards = [];
    }, 500);
  }
}

// increment moves after clicks on card
function incrementMove() {
  moves++;
  let movesCount = document.querySelector(".moves");
  movesCount.innerHTML = moves;
  if(moves > 7) {
     starRating();
  }
}

// display the number of stars as per number moves
function starRating(){
  if(moves >= 8 && moves < 12){
    starsCount.innerHTML = " ";
    starsCount.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  }
  if(moves >= 12 ){
    starsCount.innerHTML = " ";
    starsCount.innerHTML = `<li><i class="fa fa-star"></i></li>`; 
  }
}

// resets the number of stars
function resetStars() {
  starsCount.innerHTML = " ";
  starsCount.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li`;
}