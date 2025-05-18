//Global Variables
let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

//Generating Random Computer Choice
const genCompChoice = () => {
    const options = ["Rock", "Paper", "Scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

//Function for Checking Draw Game.
const drawGame = () => {
    msg.innerText = "Game Draw! Play again.";
    msg.style.backgroundColor = "#081b31";
};

//Function for Showing Winner and Displaying the text message.
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `Computer Win! ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = "red";
    }
};

//Function for playing the game.
const playGame = (userChoice) => {
    //Generate computer choice
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        //Draw Game
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "Rock") {
            //Paper, Scissors
            userWin = compChoice === "Paper" ? false : true;
        } else if (userChoice === "Paper") {
            //Scissors, Rock
            userWin = compChoice === "Scissors" ? false : true;
        } else {
            //User choose Scissors
            //Rock, Paper
            userWin = compChoice === "Rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

//Adding an event for game on clicking the choices
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

//Adding an event listener on Reset button to reset the game
resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play your move!";
    msg.style.backgroundColor = "#081b31";
});