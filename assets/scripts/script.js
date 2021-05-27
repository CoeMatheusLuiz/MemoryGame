const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
let moves = 0;
let right = 0;
let movesCounter = document.getElementById("moves");
let modal = document.getElementById("gameOver");
let gameBoard = document.getElementById("gameBoard");


startGame();

function startGame(){
    initializeCards(game.createCardsFromSkins());
}

function initializeCards(cards){
        clearVariables();
        game.cards.forEach(card => {
            let cardElement = document.createElement('div');
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.icon = card.icon;

            createCardContent(card, cardElement);

            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        })
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/skins/" + card.icon + ".jpg"
        cardElementFace.appendChild(iconElement);
    }else{
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/logo.jpg"
        cardElementFace.appendChild(iconElement);
    }

    element.appendChild(cardElementFace);
}

function flipCard() {
        if (game.setCard(this.id)) {
            this.classList.add("flip");
            if (game.secondCard) {
                movesCount();
                if (game.checkMatch()) {
                game.clearCards();
                game.checkGameOver();
                } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");
                    game.unflipCards();
                }, 500);
                }
            }
        }
    showModal();
}
  
function showModal() {
    if (game.checkGameOver()) {
      game.minMoves();
  
      modal.style.display = "flex";
    } else {
      modal.style.display = "none";
    }
  }

function restart() {
    startGame();
    game.checkGameOver();
    showModal();
}
  
function movesCount() {
    moves++;
  
    movesCounter.innerHTML = `Total de Movimentos : ${moves} movimentos`;
    document.getElementById("totalMoves").innerHTML = `Com  ${moves} movimentos`;
}
  
function clearVariables() {
    gameBoard.innerHTML = "";
    moves = 0;
    movesCounter.innerHTML = `Total de Movimentos : ${moves} movimentos`;
    document.getElementById(
      "games"
    ).innerHTML = `Melhor partida : ${game.min} movimentos`;
}
  