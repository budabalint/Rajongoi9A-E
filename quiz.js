const questions = [
    { q: "Mi Magyarország fővárosa?", options: ["Debrecen", "Szeged", "Budapest", "Győr"], answer: 2 },
    { q: "Mennyi 5 × 6?", options: ["11", "30", "25", "60"], answer: 1 },
    { q: "Melyik bolygó a Naprendszer legnagyobbika?", options: ["Mars", "Vénusz", "Föld", "Jupiter"], answer: 3 },
    { q: "Hány kontinens van a Földön?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "Ki írta a Toldit?", options: ["Petőfi Sándor", "Arany János", "Vörösmarty Mihály", "Jókai Mór"], answer: 1 },
    { q: "Melyik évben lett Magyarország EU-tag?", options: ["2000", "2004", "2010", "1995"], answer: 1 },
    { q: "Hány óra van egy napban?", options: ["12", "24", "36", "48"], answer: 1 },
    { q: "Mi az emberi test legnagyobb szerve?", options: ["Szív", "Máj", "Bőr", "Tüdő"], answer: 2 },
    { q: "Milyen színű a tiszta víz?", options: ["Kék", "Átlátszó", "Zöld", "Fehér"], answer: 1 },
    { q: "Hány hónap van egy évben?", options: ["10", "12", "14", "16"], answer: 1 }
];

function loadQuiz() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";
    
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
    } else {
        button.classList.add("incorrect");
    }
    let buttons = button.parentNode.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
}

loadQuiz();