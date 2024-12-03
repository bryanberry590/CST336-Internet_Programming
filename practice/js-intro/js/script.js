
let guessButton = document.querySelector("#guessButton");
let guessInput = document.querySelector("#guessInput");

guessButton.addEventListener("click", function() {
    let message = document.querySelector("#message");
    message.innerText = `The number you entered is ${guessInput.value}`;
    message.style.color = "green";
    message.style.fontWeight = "bold";
});






//alert(new Date());
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth()

console.log(today);
console.log(year);
console.log(month);
console.dir(today);

month = getMonthName(today.getMonth());
console.log(month);

function displayTime(){
    document.querySelector("h2").innerText = today.toLocaleTimeString();
}

function displayDate() {
    document.querySelector("h1").innerText = today.toDateString();
}

function getMonthName(monthIndex){
    switch(monthIndex) {
        case 0 : {
            return "January";
            break;
        }
        case 1 : {
            return "February";
            break;
        }
        case 2 : {
            return "March";
            break;
        }
        case 3 : {
            return "April";
            break;
        }
        case 4 : {
            return "May";
            break;
        }
        case 5 : {
            return "June";
            break;
        }
        case 6 : {
            return "July";
            break;
        }
        case 7 : {
            return "August";
            break;
        }
        case 8 : {
            return "September";
            break;
        }
        case 9 : {
            return "October";
            break;
        }
        case 10 : {
            return "November";
            break;
        }
        case 11 : {
            return "December";
            break;
        }
        default : {
            return "Invalid";
            break;
        }
    }
}