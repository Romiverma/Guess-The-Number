const guessInput = document.querySelector("#guessInput");
const checkBtn = document.querySelector("#checkBtn");
const message = document.querySelector("#message");
const attemptsDisplay = document.querySelector("#attempts");
const bestScoreDisplay = document.querySelector("#bestScore");
const resetBtn = document.querySelector("#resetBtn");

let secretNumber;
let attempts = 0;
let bestScore = localStorage.getItem("bestScore");
bestScoreDisplay.textContent = bestScore || "--";

function generateRandomNumber() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
}

generateRandomNumber();


checkBtn.addEventListener("click", function () {
    let guess = Number(guessInput.value);
    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        message.textContent = "Please enter a number between 1 and 100!";
        guessInput.focus();
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess < secretNumber) {
        message.textContent = "Too Low! Try a higher number. ⬆️";
    } 
    else if (guess > secretNumber) {
        message.textContent = "Too High! Try a lower number. ⬇️";
    } 
    else {
        message.textContent = `🎉 Congratulations! You guessed it in ${attempts} attempts!`;
        if (bestScore === null || attempts < Number(bestScore)) {
            bestScore = attempts;
            localStorage.setItem("bestScore", bestScore);
            bestScoreDisplay.textContent = bestScore;
        }

        checkBtn.disabled = true;
        guessInput.disabled = true;
    }

    guessInput.value = "";
    guessInput.focus();
});

resetBtn.addEventListener("click", function () {
    generateRandomNumber();
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    guessInput.value = "";
    guessInput.disabled = false;
    checkBtn.disabled = false;
    message.textContent = "Your adventure starts here!";
    guessInput.focus();
});
