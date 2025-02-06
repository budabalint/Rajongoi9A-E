const questions = [
    { q: "Mikor alapították az iskolát?", options: ["1898", "1901", "1921", "1923"], answer: 1 },
    { q: "Milyen képzésre nem tudsz jelentkezni az iskolában?", options: ["Gépész technikus", "Informatikai rendszer- és alkalmazás-üzemeltető technikus", "Szoftverfejlesztő és -tesztelő technikus", "Infokommunikációs hálózatépítő és -üzemeltető technikus szakma"], answer: 3 },
    { q: "Hol született jedlik Ányos?", options: ["Győr", "Szímő", "Kiskunfélegyháza", "Fertőrákos"], answer: 1 },
    { q: "Hány évet élt jedlik Ányos?", options: ["63", "72", "84", "95"], answer: 3 },
    { q: "Kik a legjobbak?", options: ["Gépészek", "Infósok", "Mindkettő", "Egyik sem"], answer: 1 },
    { q: "Melyik épületben található Konyha?", options: ["A Épület", "B Épület", "Mindkettő", "Egyik sem"], answer: 0 },
    { q: "Mikor alkotta a szódavizet?", options: ["1824", "1825", "1826", "1827"], answer: 2 },
    { q: "Hol készültek a zöld csempék?", options: ["Kalocsa", "Budapest", "Herend", "Zsolna"], answer: 3 },
    { q: "Mi nem található a jedlikben?", options: ["wc papír", "könyvtár", "büfé", "ketrec"], answer: 0 },
    { q: "Mi volt Jedlik Ányos eredeti keresztneve?", options: ["Áron", "István", "Péter", "Rezső"], answer: 1 }
];

let score = 0;
let totalQuestions = questions.length;

function loadQuiz() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";
    score = 0;
    
    questions.forEach((question, index) => {
        let questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.textContent = (index + 1) + ". " + question.q;
        
        let optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options");
        
        question.options.forEach((option, i) => {
            let button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => checkAnswer(button, i, question.answer);
            optionsContainer.appendChild(button);
        });
        
        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(optionsContainer);
    });
}

function checkAnswer(button, selected, correct) {
    if (selected === correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
    }
    let buttons = button.parentNode.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
    if (allQuestionsAnswered()) {
        showFinalScore();
    }
}

function allQuestionsAnswered() {
    return document.querySelectorAll(".options button:not([disabled])").length === 0;
}

function showFinalScore() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `<p>Végeredmény: ${score} / ${totalQuestions}</p>`;
    
    let restartButton = document.createElement("button");
    restartButton.classList.add("restart");
    restartButton.textContent = "Újrakezdés";
    restartButton.onclick = loadQuiz;
    quizContainer.appendChild(restartButton);
}

loadQuiz();
