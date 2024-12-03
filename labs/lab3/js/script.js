let score = 0;
let attemptCounter = window.localStorage.getItem("attempts");
if(attemptCounter == null) {
    window.localStorage.setItem("attempts", 0);
    attemptCounter = 0;
}
document.querySelector("#attemptCount").innerText = "Total Attempts: " + window.localStorage.getItem("attempts");;

//event listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

displayQ2Choices();

function displayQ2Choices(){
    let q2Choices = ["size","text-size","textSize","font-size"];
    q2Choices = _.shuffle(q2Choices);

    for(let choice of q2Choices) {
        let inputElement = document.createElement("input");
        inputElement.name = "q2";
        inputElement.type = "radio";
        inputElement.value = choice;
        console.log(inputElement);
    
        let labelElement = document.createElement("label");
        labelElement.innerText = choice;
        
        labelElement.prepend(inputElement);
    
        document.querySelector("#q2Choices").appendChild(labelElement);
    }

}

function gradeQuiz(){
    attemptCounter++;
    window.localStorage.setItem("attempts", attemptCounter);

    console.log("grading quiz..");
    let tryCount = document.querySelector("#attemptCount");
    let q1UserAnswer = document.querySelector("#q1Choices").value;
    let q2UserAnswer = document.querySelector("input[name=q2]:checked").value;
    let q3UserAnswer = document.querySelector("#q3").value;
    let q4UserAnswer = document.querySelector("#q4").value;
    let q5UserAnswer = document.querySelector("#q5").value;

    let q1Answer = document.querySelector("#q1Answer");
    let q2Answer = document.querySelector("#q2Answer");
    let q3Answer = document.querySelector("#q3Answer");
    let q4Answer = document.querySelector("#q4Answer");
    let q5Answer = document.querySelector("#q5Answer");
    let winMsg = document.querySelector("#winMessage");

    let img1 = document.querySelector("#image1");
    let img2 = document.querySelector("#image2");
    let img3 = document.querySelector("#image3");
    let img4 = document.querySelector("#image4");
    let img5 = document.querySelector("#image5");

    img1.width = 50;
    img1.height = 50;
    img2.width = 50;
    img2.height = 50;
    img3.width = 50;
    img3.height = 50;
    img4.width = 50;
    img4.height = 50;
    img5.width = 50;
    img5.height = 50;

    tryCount.innerText = "Total Attempts: " + window.localStorage.getItem("attempts");

    score = 0;
    if(q1UserAnswer == "color") {
        score += 20;
        q1Answer.innerText = "Correct";
        q1Answer.style.color = "Green";
        img1.src = "img/check.png";
    } else {
        q1Answer.innerText = "Incorrect";
        q1Answer.style.color = "Red";
        img2.src = "img/x.png";
    }

    if(q2UserAnswer == "font-size") {
        score += 20;
        q2Answer.innerText = "Correct";
        q2Answer.style.color = "Green";
        img2.src = "img/check.png";
    } else {
        q2Answer.innerText = "Incorrect";
        q2Answer.style.color = "Red";
        img2.src = "img/x.png";

    }

    if(q3UserAnswer == 2) {
        score += 20;
        q3Answer.innerText = "Correct";
        q3Answer.style.color = "Green";
        img3.src = "img/check.png";
    } else {
        q3Answer.innerText = "Incorrect";
        q3Answer.style.color = "Red";
        img3.src = "img/x.png";
    }

    if(q4UserAnswer == "january") {
        score += 20;
        q4Answer.innerText = "Correct";
        q4Answer.style.color = "Green";
        img4.src = "img/check.png";
    } else {
        q4Answer.innerText = "Incorrect";
        q4Answer.style.color = "Red";
        img4.src = "img/x.png";

    }

    if(q5UserAnswer == 2025) {
        score += 20;
        q5Answer.innerText = "Correct";
        q5Answer.style.color = "Green";
        img5.src = "img/check.png";
    } else {
        q5Answer.innerText = "Incorrect";
        q5Answer.style.color = "Red";
        img5.src = "img/x.png";
    }

    document.querySelector("#score").innerText = "Score: " + score;
    if(score >= 80) {
        winMsg.innerText = "Congratulations! You beat the game with a score of " + score;
    } else {
        winMsg.innerText = "";
    }
}

