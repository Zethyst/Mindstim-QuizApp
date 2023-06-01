//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector(".time_line");
const time_line_container = document.querySelector(".time_line_container");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const question = document.querySelector('.question');
const option1 = document.querySelector('#opt1');
const option2 = document.querySelector('#opt2');
const option3 = document.querySelector('#opt3');
const option4 = document.querySelector('#opt4');
const submitBtn = document.getElementById('submit');
const options = document.querySelectorAll('.answer');
const quizWrapper = document.querySelector('#quiz-wrapper');
const result = document.querySelector('#result');
const scoreCard = document.getElementById("ScoreCard");
const scoreBoxContainer = document.getElementById("popup");
const scoreBoxGreen = document.querySelector(".scoreContainerGreen");
const scoreBoxRed = document.querySelector(".scoreContainerRed");
const scoreGreen = document.querySelector('.scoreGreen');
const scoreRed = document.querySelector('.scoreRed');
const earn_lose = document.getElementById('earn_lose');
const score_total = document.querySelector('#score');
const total_que = document.querySelector('.totalque');
const total_points = document.querySelector('.pointstext');
const total_correct = document.querySelector('.stat-box-correct .value');
const total_incorrect = document.querySelector('.stat-box-incorrect .value');
const total_unattempted = document.querySelector('.stat-box-unattempted .value');
const success_fill = document.querySelector('.accuracy-success-fill');
const danger_fill = document.querySelector('.accuracy-danger-fill');
const tooltipBox = document.querySelector('.accuracy-label-tooltip');
const tooltip = document.querySelector('.tooltiptext');
const countdown_timer = document.querySelector('.countdown-timer')
const three = document.getElementById("three");
const two = document.getElementById("two");
const one = document.getElementById("one");
const go = document.getElementById("go");
const shutterUp = document.querySelector(".halfShutterUp");
const footer = document.querySelector('.site-footer');
const banner = document.querySelector(".banner");


var g = document.getElementById("Green-Sound");
var r = document.getElementById("Red-Sound");
var c = document.getElementById("Count-Sound");
var gogo = document.getElementById("Go-Sound");
var blank = document.getElementById("Blank-Sound");

function playGreen() {
    g.play();
}

function playRed() {
    r.play();
}
function playCount() {
    c.play();
}

function playGo() {
    gogo.play();
}
function playBlank() {
    blank.play();
}

// if startQuiz button clicked
start_btn.onclick = () => {
    start_btn.classList.toggle("hidden");
    info_box.classList.toggle("hidden"); //show info box
    playBlank();
    banner.classList.add("hidden");
}

// if exitQuiz button clicked
exit_btn.onclick = () => {
    banner.classList.remove("hidden");
    start_btn.classList.toggle("hidden");
    info_box.classList.toggle("hidden"); //hide info box
}



// if continueQuiz button clicked
continue_btn.onclick = () => {
    playCount();
    info_box.classList.toggle("hidden"); //hide info box
    countdown_timer.classList.remove("hidden");
    three.addEventListener("animationend", (e) => {
        playCount();
        countdown_timer.classList.add("hidden");
        countdown_timer.nextElementSibling.classList.remove("hidden");
        three.classList.remove("zoom-in-zoom-out");
        two.classList.add("zoom-in-zoom-out");

        two.addEventListener("animationend", (e) => {
            playCount();
            countdown_timer.nextElementSibling.classList.add("hidden");
            countdown_timer.nextElementSibling.nextElementSibling.classList.remove("hidden");
            two.classList.remove("zoom-in-zoom-out");
            one.classList.add("zoom-in-zoom-out");

            one.addEventListener("animationend", (e) => {
                playGo();
                countdown_timer.nextElementSibling.nextElementSibling.classList.add("hidden");
                countdown_timer.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove("hidden");
                one.classList.remove("zoom-in-zoom-out");
                go.classList.add("zoom-in-zoom-out");

                go.addEventListener("animationend", (e) => {
                    footer.classList.add("slideInDown");
                    countdown_timer.nextElementSibling.nextElementSibling.nextElementSibling.classList.add("hidden");
                    go.classList.remove("zoom-in-zoom-out");

                    shutterUp.classList.toggle("hidden");
                    shutterUp.nextElementSibling.classList.toggle("hidden");
                    shutterUp.addEventListener("animationend", (e) => {
                        shutterUp.classList.toggle("hidden");
                        shutterUp.nextElementSibling.classList.toggle("hidden");
                    });
                });
            });
        });
    });

    setTimeout(() => {
        footer.classList.add("hidden");
        quiz_box.classList.toggle("hidden"); //show quiz box
        time_line_container.classList.toggle("hidden");
        loadQuestion(queIndex); //calling showQestions function
        queCounter(1); //passing 1 parameter to queCounter
        startTimer(15); //calling startTimer function
        startTimerLine(0); //calling startTimerLine function
    }, 5000)
}
let timeValue = 15;
var que_count = 0;
var que_numb = 1;
var userScore = 0;
var scorePoints = 0;
var correct = 0;
var incorrect = 0;
var unattempted = 0;
var percentage = 0;
let counter;
let counterLine;
let widthValue = 0;

const finalShow = document.getElementById("final");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
    next.classList.toggle("hidden");
    quiz_box.classList.toggle("hidden"); //show quiz box
    time_line_container.classList.toggle("hidden");
    finalShow.classList.toggle("hidden"); //hide result box
    let timeValue = 15;
    let counter;
    let counterLine;
    let widthValue = 0;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    scorePoints = 0;
    correct = 0;
    incorrect = 0;
    unattempted = 0;
    loadQuestion(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.toggle("hidden"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const next = document.getElementById("next");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
    if (!scoreCard.classList.contains("hidden")) {
        scoreCard.classList.add("hidden");
    }
    if (!scoreBoxGreen.classList.contains("hidden")) {
        scoreBoxGreen.classList.add("hidden");
    }
    if (!scoreBoxRed.classList.contains("hidden")) {
        scoreBoxRed.classList.add("hidden");
    }

    if (que_count < quizArr.length - 1) { //if question count is less than total question length
        que_count++; //increment the que_count value
        queIndex++; //increment the que_count value
        que_numb++; //increment the que_numb value
        loadQuestion(queIndex); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next.classList.toggle("hidden"); //hide the next button
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    clearTimeout(redTimeout);
    clearTimeout(greenTimeout);
    clearTimeout(popTimeout);
    clearTimeout(pop);
    let userAns = answer.textContent; //getting user selected option
    let correcAns = quizArr[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    scoreCard.classList.remove("hidden");
    // scoreBoxGreen.classList.remove("hidden")
    // scoreBoxRed.classList.remove("hidden")
    scoreBoxContainer.classList.add("slideInUp");

    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
        scoreBoxContainer.style.background = "#08cc84";
        // scoreBoxGreen.classList.remove("hidden")
        userScore += 1; //upgrading score value with 1
        correct += 1;
        scorePoints += que_numb * 10 * timeValue;
        scoreGreen.innerHTML = "+" + que_numb * 10 * timeValue;
        scoreBoxGreen.classList.remove("hidden");
       var greenTimeout= setTimeout(() => {
            if (!scoreBoxGreen.classList.contains("hidden")) {
                scoreBoxGreen.classList.add("hidden");
            }
            // scoreBoxGreen.classList.add("hidden");
        }, 4000);
        playGreen();
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    } else {
        scoreBoxContainer.style.background = "#f0144c";
        // scoreBoxRed.classList.remove("hidden")
        incorrect += 1;
        scorePoints -= 5 * timeValue;
        scoreRed.innerHTML = "-" + que_numb * 5 * timeValue;
        scoreBoxRed.classList.remove("hidden");
        var redTimeout=setTimeout(() => {
            if (!scoreBoxRed.classList.contains("hidden")) {
                scoreBoxRed.classList.add("hidden");
            }
            // scoreBoxRed.classList.add("hidden");
        }, 4000);
        navigator.vibrate(200);
        playRed();
        answer.classList.add("apply-shake");
        answer.addEventListener("animationend", (e) => {
            answer.classList.remove("apply-shake");
            answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        })
        answer.classList.add("incorrect"); //adding red color to correct selected option
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    const allOptionslen = option_list.children.length; //getting all option items 
    for (i = 0; i < allOptionslen; i++) {
        if (option_list.children[i].textContent == quizArr[que_count].answer) { //if there is an option which is matched to an array answer
            option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
        }
    }
    next.classList.toggle("hidden"); //show the next button if user selected any option

    scoreBoxContainer.addEventListener("animationend", (e) => {
        scoreBoxContainer.classList.remove("slideInUp");
    })
    var popTimeout=setTimeout(() => {
        if (!scoreBoxContainer.classList.contains("slideInUp")) {
            scoreBoxContainer.classList.add("slideInDown");
        }
    }, 3000);
    var pop=setTimeout(() => {
        scoreCard.classList.add("hidden");
        scoreBoxContainer.classList.remove("slideInDown");
    }, 4000);
}

function showResult() {
    total_que.innerHTML = quizArr.length;
    total_points.innerHTML = scorePoints;
    total_correct.innerHTML = correct;
    total_incorrect.innerHTML = incorrect;
    total_unattempted.innerHTML = unattempted;
    percentage = Math.trunc(((Number.parseInt(correct)) / quizArr.length) * 100);
    tooltip.innerHTML = `${percentage}%`;

    success_fill.style.width = `${percentage}%`;
    danger_fill.style.width = `${100 - percentage}%`
    tooltipBox.style.left = `calc(${percentage}% - 29px)`
    if (Number.parseInt(scorePoints) < 0) {
        earn_lose.innerText = "LOST COINS"
    }
    else {
        earn_lose.innerText = "EARNED COINS"
    }
    quiz_box.classList.toggle("hidden"); //hide quiz box
    time_line_container.classList.toggle("hidden");
    finalShow.classList.toggle("hidden"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) { // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>' + userScore + '</p> out of <p>' + quizArr.length + '</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if (userScore > 1) { // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>' + userScore + '</p> out of <p>' + quizArr.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>' + userScore + '</p> out of <p>' + quizArr.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    score_total.innerHTML = userScore;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            unattempted += 1;
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptionslen = option_list.children.length; //getting all option items
            let correcAns = quizArr[que_count].answer; //getting correct answer from array
            for (i = 0; i < allOptionslen; i++) {
                if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptionslen; i++) {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next.classList.toggle("hidden"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time) {
    var w = window.innerWidth;
    var t = 26.5;

    if (w<350) {
        t = 57.5;   
    }
    else if (w < 400) {
        t = 50.5;
    }
    else if (w < 550) {
        t = 36;
    }
    else if (w < 800) {
        t = 30.5;
    }
    counterLine = setInterval(timer, t);
    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > 596) { //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(queIndex) {

    let totalQueCounTag = '<span><p id="lightup">' + queIndex + '</p> of <p>' + quizArr.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

let queIndex = 0;
let score = 0;

const loadQuestion = () => {
    let quiz = quizArr[que_count];
    question.innerHTML = `${que_count + 1}. ${quiz.question}`;
    option1.innerHTML = quiz.opt1;
    option2.innerHTML = quiz.opt2;
    option3.innerHTML = quiz.opt3;
    option4.innerHTML = quiz.opt4;
    const option = option_list.querySelectorAll(".option");
    const allOptions = option_list.children.length;

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.remove("disabled"); //once user select an option then disabled all options
        option_list.children[i].classList.remove("correct"); //once user select an option then disabled all options
        option_list.children[i].classList.remove("incorrect"); //once user select an option then disabled all options
    }
}