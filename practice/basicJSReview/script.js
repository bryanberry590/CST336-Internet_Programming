document.querySelector("#btn").addEventListener("click", letterGrade);

function letterGrade(){
    console.log("HERE");
    let currGrade = document.querySelector("#options").value;
    let displayGrade = document.querySelector("#grade");

    if(currGrade == "75") {
        displayGrade.innerText = "C";
    } else if (currGrade == "85"){
        displayGrade.innerText = "B";
    } else if(currGrade == "95") {
        displayGrade.innerText = "A";
    } else if(currGrade == "100") {
        displayGrade.innerText = "A+";
    }
}