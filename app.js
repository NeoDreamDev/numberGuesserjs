/*
GAME FUNCTION:
 - PLAYER MUST GUESS A NUMBER BETWEEN A MINIMUM AND A MAXIMUM
 - PLAYER GETS A CERTAIN AMOUNT OF GUESSES
 - NOTIFY PLAYER OF THE GUESSES REMAINING
 - NOTIFY THE PLAYER OF THE CORRECT ANSWER IF THEY LOSE
 LET THE PLAYER CHOOSE TO PLAY AGAIN
*/

// GAME VALUES
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 5;

// UI ELEMENTS

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// ASSIGN UI MIN AND MAX
minNum.textContent = min;
maxNum.textContent = max;

// PLAY AGAIN EVENT LISTENER
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// LISTEN FOR GUESS
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // VALIDATE INPUT
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please Enter a Number Between ${min} and ${max}`, 'red');
    }

    // CHECK IF WON 
    if (guess == winningNum) {
        // GAME OVER - WON
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
        // WRONG NUMBER
        guessesLeft -= 1;

        // guessesLeft = guessesLeft - 1;
        if (guessesLeft === 0) {
            // GAME OVER - LOST
            gameOver(false, `GAME OVER, you lost sucka! The correct number was ${winningNum}`)
        } else {
            // GAME CONTINUES - ANSWER WRONG

            // CHANGE BORDER COLOR
            guessInput.style.borderColor = "red";

            //  CLEAR INPUT
            guessInput.value = '';

            // TELL USER ITS WRONG AND HOW MANY GUESSES THEY HAVE LEFT
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red')
        }

    }
});

// GAME OVER
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // DISABLE INPUT
    guessInput.disabled = true;
    // CHANGE BORDER COLOR
    guessInput.style.borderColor = color;
    // SET TEXT COLOR
    message.style.color = color;
    // SET MESSAGE
    setMessage(msg);

    // PLAY AGAIN
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// GET WINNING NUMBER
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// SET MESSAGE
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}