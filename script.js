// Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for(let button of buttons) {
         button.addEventListener("click", function(){
             if (this.getAttribute("data-type") == "submit") {
                 checkAnswer();
             } else {
                 let gameType = this.getAttribute("data-type");
                 runGame(gameType);
             }
         })
    }

    //This bit is looking out for someone to enter their answer by hitting the enter button.
    document.getElementById("answer-box").addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

function runGame(gameType) {
    // Generate two random number between 1 and 25
    // Math.floor rounds down to the whole number
    // Math.random generates random numbers

    // This line resets the value once the last answer has been submitted.
    document.getElementById("answer-box").value = "";

    //This adds the cursor into the answer box as the page loads. Focus tells the page what to focus on first.
    document.getElementById("answer-box").focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivideQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }
}

function checkAnswer() {
//Checks the answer against the first element in the returned calculateCorrectAnswer array

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Dat's Qwik Maths!");
        incrementScore();
    } else {
        alert(`Dat's not Qwik Maths. You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
//Gets the operands )the numbers and the operator (plus, minus etc) directly from the DOM
//Using parseInt means that it returns an Integer (number) instead of the default string returned.
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }
}

function incrementScore() {
// Gets the current score from the DOM and increments it
// ++oldScore is the same as oldScore + 1
// ++ means to add one to the value

   let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer() {
    // Gets the current tally of incorrect answers from the DOM and increments it

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    // this asks is operand1 bigger than operand2. If it is, return that, if not, return operand2
    // condition ? true part : false part
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivideQuestion(operand1, operand2) {
    //This multiplies operand1 by operand2 so that when operand2 is the dividing the larger number it returns a round number.
	document.getElementById("operand1").textContent = operand1 * operand2;
	document.getElementById("operand2").textContent = operand2;
	document.getElementById("operator").textContent = "/";
}