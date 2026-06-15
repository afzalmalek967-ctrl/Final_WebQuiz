/* QUESTIONS */

let questions = [];

let savedQuestions =
localStorage.getItem("quizQuestions");

if(savedQuestions){

    questions =
    JSON.parse(savedQuestions);
}

else{

    questions = [];
}

/* VARIABLES */

let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;

let timeLeft = 30;
let timer;

/* LOAD QUESTION */

function loadQuestion(){

    if(questions.length == 0){

        document.querySelector(".quiz-box").innerHTML =

        "<h1 style='text-align:center;'>No Questions Available ❌</h1>";

        return;
    }

    document.getElementById("question").innerHTML =
    questions[currentQuestion].question;

    for(let i=0; i<4; i++){

        let option =
        document.getElementById("opt"+i);

        option.innerHTML =
        questions[currentQuestion].options[i];

        option.classList.remove("selected");
    }

    selectedAnswer = -1;

    startTimer();
}

/* SELECT ANSWER */

function checkAnswer(selected){

    selectedAnswer = selected;

    for(let i=0; i<4; i++){

        document.getElementById("opt"+i)
        .classList.remove("selected");
    }

    document.getElementById("opt"+selected)
    .classList.add("selected");
}

/* NEXT QUESTION */

function nextQuestion(){

    clearInterval(timer);

    if(selectedAnswer ==
       questions[currentQuestion].answer)
    {
        score++;
    }

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();
    }

    else{

        document.querySelector(".quiz-box").innerHTML =

        "<h1 style='text-align:center;'>Quiz Completed ✅</h1>" +

        "<h2 style='text-align:center; margin-top:20px;'>Your Score : "
        + score + "/" + questions.length +
        "</h2>" +

        "<div style='text-align:center; margin-top:35px;'>" +

        "<button onclick='downloadCertificate()' style='padding:15px 25px; background:#2563eb; color:white; border:none; border-radius:10px; font-size:18px; font-weight:bold; cursor:pointer; margin:10px;'>DOWNLOAD CERTIFICATE</button>" +

        "<button onclick='goLogin()' style='padding:15px 25px; background:red; color:white; border:none; border-radius:10px; font-size:18px; font-weight:bold; cursor:pointer; margin:10px;'>LOGIN PAGE</button>" +

        "</div>";
    }
}

/* TIMER */

function startTimer(){

    timeLeft = 30;

    document.getElementById("time").innerHTML =
    timeLeft;

    timer = setInterval(function(){

        timeLeft--;

        document.getElementById("time").innerHTML =
        timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            nextQuestion();
        }

    },1000);
}

/* DOWNLOAD CERTIFICATE */

function downloadCertificate(){

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    let student = users[users.length-1];

    let studentName = student.name;
    let enroll = student.enroll;
    let email = student.email;
    let dept = student.dept;
    let sem = student.sem;

    let certificateWindow =
    window.open('', '', 'width=1000,height=700');

    certificateWindow.document.write(`

    <html>

    <head>

    <title>Quiz Certificate</title>

    <style>

    body{
        margin:0;
        padding:0;
        font-family:Arial,sans-serif;
        background:#f4f4f4;
    }

    .certificate{
        width:900px;
        height:600px;
        margin:30px auto;
        background:white;
        border:15px solid #0f172a;
        padding:40px;
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }

    .top{
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

    .logo{
        width:100px;
        height:100px;
        border-radius:50%;
        overflow:hidden;
        border:4px solid #2563eb;
    }

    .logo img{
        width:100%;
        height:100%;
        object-fit:cover;
    }

    .title{
        text-align:center;
        flex:1;
    }

    .title h1{
        font-size:42px;
        color:#0f172a;
    }

    .title h2{
        color:#475569;
    }

    .content{
        text-align:center;
        margin-top:50px;
    }

    .student-name{
        font-size:40px;
        color:#2563eb;
        font-weight:bold;
        margin:20px 0;
    }

    .info{
        font-size:22px;
        line-height:45px;
        margin-top:20px;
    }

    .score{
        margin-top:30px;
        font-size:34px;
        color:red;
        font-weight:bold;
    }

    .btn{
        margin-top:40px;
        padding:15px 30px;
        border:none;
        border-radius:10px;
        background:red;
        color:white;
        font-size:18px;
        font-weight:bold;
        cursor:pointer;
    }

    </style>

    </head>

    <body>

    <div class="certificate">

        <div class="top">

            <div class="logo">
                <img src="c_logo.png">
            </div>

            <div class="title">
                <h1>WEB QUIZ CERTIFICATE</h1>
                <h2>Certificate Of Achievement</h2>
            </div>

            <div class="logo">
                <img src="g_logo.png">
            </div>

        </div>

        <div class="content">

            <h2>This Certificate Is Presented To</h2>

            <div class="student-name">
                ${studentName}
            </div>

            <div class="info">

                <b>Enrollment No:</b>
                ${enroll}<br>

                <b>Email:</b>
                ${email}<br>

                <b>Department:</b>
                ${dept}<br>

                <b>Semester:</b>
                ${sem}

            </div>

            <div class="score">

                Score : ${score}/${questions.length}

            </div>

            <button class="btn"
            onclick="window.print()">

                DOWNLOAD / PRINT

            </button>

        </div>

    </div>

    </body>

    </html>

    `);

    certificateWindow.document.close();
}

/* LOGIN PAGE */

function goLogin(){

    window.location.href =
    "login.html";
}

/* START QUIZ */

loadQuestion();