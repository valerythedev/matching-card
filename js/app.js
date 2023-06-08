const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

let matchedCards = 0;
const totalCards = cards.length;

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matchedCards += 2;
  resetBoard();

  if (matchedCards === totalCards) {
    alert('Congratulations! You have matched all the cards!');
    createReset()
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
  
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 10);
    card.style.order = randomPos;
    
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function createReset() {

  const link = document.createElement('a');
  link.href = 'index.html';

  const button = document.createElement('button');
  button.innerText = 'get anotha one';
  button.classList.add('theOne')
  link.appendChild(button);

  document.body.appendChild(link);
}


