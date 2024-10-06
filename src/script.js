const questions = [
    {
        question: "What is the Capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "Delhi", correct: true },
            { text: "Bangalore", correct: false },
            { text: "Chennai", correct: false }
        ]
    },
    {
        question: "What is the Capital of USA?",
        answers: [
            { text: "New York", correct: false },
            { text: "Los Angeles", correct: false },
            { text: "Washington D.C.", correct: true },
            { text: "Chicago", correct: false }
        ]
    },
    {
        question: "What is the Capital of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Perth", correct: false }
        ]
    }
];

const newques = document.querySelector(".font-medium");
const answerbutton = document.querySelector(".answer_button");
const nextbutton = document.querySelector(".nextbutton");

let index = 0;  // Use 'let' instead of 'const'
let score = 0;  // Use 'let' instead of 'const'

function startquiz() {
    index = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQues();
}

function showQues() {
    resetState();
    const currques = questions[index];
    newques.innerHTML = `${index + 1}. ${currques.question}`;

    currques.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn", "w-full", "p-[10px]", "border", "border-black", "rounded-md", "text-left", "my-2");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', (e) => selanswer(e, button));
        answerbutton.appendChild(button);
    });
}

function selanswer(e, selectedButton) {
    const correct = selectedButton.dataset.correct === "true";

    // Set the color based on whether the selected answer is correct
    if (correct) {
        score += 1;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    // Show the correct answer and disable all buttons
    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Highlight correct answer
        }
        button.disabled = true; // Disable all buttons
    });

    // Show the next button after answering
    nextbutton.style.display = "block";
}

function resetState() {
    nextbutton.style.display = "none"; // Hide the next button initially
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function handlenextbutton() {
    index++;
    if (index < questions.length) {
        showQues();
    } else {
        showScore();
    }
}

nextbutton.addEventListener('click', () => {
    if (index < questions.length) {
        handlenextbutton();
    } else {
        startquiz();
    }
});

function showScore() {
    resetState();
    newques.innerHTML = `Your final score is ${score} out of ${questions.length}`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

startquiz();

