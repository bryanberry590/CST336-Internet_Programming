document.querySelector("#textColorBtn").addEventListener("click", changeTextColor);
document.querySelector("#textSizeBtn").addEventListener("click", changeTextSize);
document.querySelector("#bgColorBtn").addEventListener("click", changeBgColor);
document.querySelector("#alignmentBtn").addEventListener("click", changeAlignment);
 
function changeAlignment(){
    if (document.querySelector("#alignment").checked) {
        document.querySelector("body").style.textAlign = "center";
    } else {
        document.querySelector("body").style.textAlign = "left";
    }
}

function changeBgColor() {
    let bc = document.querySelector("#bgColor").value;

    document.querySelector("body").style.backgroundColor = bc;
}

function changeTextColor() {
    let textColor = document.querySelector("#textColor").value;

    document.querySelector("body").style.color = textColor;
}

function changeTextSize() {
    let textSize = document.querySelector("#textSize").value; 

    document.querySelector("body").style.fontSize = textSize + "em";
}