const questions = [
    {
        question: "What is the name of the magical object that Harry Potter uses to defeat Lord Voldemort?",
        answers:[
            {text:"A. The Resurrection Stone",correct:false},
            {text:"B. The Sorcerer's Stone",correct:false},
            {text:"C. The Elder Wand",correct:true}
        ]
    },
    {
        question: "Who is the Headmaster of Hogwarts School of Witchcraft and Wizardry at the beginning of Harry's first year?",
        answers:[
            {text:"A. Albus Dumbledore",correct:true},
            {text:"B. Severus Snape",correct:false},
            {text:"C. Minerva McGonagall",correct:false}
        ]
    },
    {
        question: "What is the name of the Patronus Charm that Harry uses to ward off dementors?",
        answers:[
            {text:"A. A dog",correct:false},
            {text:"B. A phoenix",correct:false},
            {text:"C. A stag",correct:true}
        ]
    },
    {
        question: "Who is the Half-Blood Prince mentioned in the sixth book of the series?",
        answers:[
            {text:"A. Tom Riddle",correct:false},
            {text:"B. Severus Snape",correct:true},
            {text:"C. Sirius Black",correct:false}
        ]
    },
    {
        question: "What is the name of the dark wizard who created the Horcruxes?",
        answers:[
            {text:"A. Lord Voldemort",correct:true},
            {text:"B. Gellert Grindelwald",correct:false},
            {text:"C. Nicolas Flamel",correct:false}
        ]
    },
    {
        question: "What is the name of the magical creature that guards the Sorcerer's Stone in Harry's first year?",
        answers:[
            {text:"A. A dragon",correct:false},
            {text:"B. A troll",correct:false},
            {text:"C. A three-headed dog",correct:true}
        ]
    },
    {
        question: "Who is the leader of the Order of the Phoenix?",
        answers:[
            {text:"A. Sirius Black",correct:false},
            {text:"B. Minerva McGonagall",correct:false},
            {text:"C. Albus Dumbledore",correct:true}
        ]
    },
    {
        question: "What is the name of the dark magic spell used to kill a person?",
        answers:[
            {text:"A. Avada Kedavra",correct:true},
            {text:"B. Crucio",correct:false},
            {text:"C. Imperio",correct:false}
        ]
    },
    {
        question: "Who is the founder of the Ravenclaw house at Hogwarts?",
        answers:[
            {text:"A. Godric Gryffindor",correct:false},
            {text:"B. Salazar Slytherin",correct:false},
            {text:"C. Rowena Ravenclaw",correct:true}
        ]
    },
    {
        question: "What is the name of the magical object that can be used to see one's past, present, and future?",
        answers:[
            {text:"A. The Mirror of Erised",correct:true},
            {text:"B. The Time-Turner",correct:false},
            {text:"C. The Marauder's Map",correct:false}
        ]
    },

];

const questionElement = document.getElementById("qstn");
const answerButtons = document.getElementById("ans-btns");
const nextButton = document.getElementById("next-btn");

let curr_qstn_index = 0;
let score = 0;

function startQuiz(){
    curr_qstn_index = 0;
    score =0;
    nextButton.innerHTML="Next";
    showQstn();
}

function showQstn(){
    resetState();
    let curr_qstn = questions[curr_qstn_index];
    let qstn_no = curr_qstn_index + 1;
    questionElement.innerHTML = qstn_no + "." + curr_qstn.question;

    curr_qstn.answers.forEach(ans =>{
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if(ans.correct){
            button.dataset.correct = ans.correct;
        }
        answerButtons.addEventListener("click",selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;  
    })
    nextButton.style.display = "block"
}
function showScore(){
    resetState();

    questionElement.innerHTML = `You scored ${score} out of ${questions.length} ! I know you got this ;) `;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    curr_qstn_index++;
    if(curr_qstn_index < questions.length){
        showQstn();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(curr_qstn_index < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
