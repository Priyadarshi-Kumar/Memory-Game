
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function startTimer() {
     let timer = document.querySelector(".time").innerHTML;
     let arr = timer.split(":");
     let hour = arr[0];
     let min = arr[1];
     let sec = arr[2];

     if (sec === 59) {
       if (min === 59) {
         hour++;
         min = 0;

         if (hour < 10) {
           hour = "0" + hour;
         }
       }
       else {
         min++;
       }
       if (min < 10) {
         min = "0" + min;
       }
       sec = 0;
     }
     else {
       sec++;
       if (sec < 10) {
         sec = "0" + sec;
       }
     }

     //updates the html with time value
     document.querySelector(".time").innerHTML = hour + ":" + min + ":" + sec;
     setTimeout(startTimer, 1000);
}

function resetTimer() {
  document.querySelector(".time").innerHTML = "00" + ":" + "00" + ":" + "00";
}
