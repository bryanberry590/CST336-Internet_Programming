let images = [
    "img/bar.png",
    "img/cherry.png",
    "img/seven.png"
];

let credit = 0;

let imageBox = document.querySelector("#slots");
let message = document.querySelector("#message");
let spinBtn = document.querySelector("#spin");
let creditPrompt = document.querySelector("#creditMsg");
let creditButton = document.querySelector("#creditBtn");
let currCreds = document.querySelector("#currAmount");


creditButton.addEventListener("click", setCreds);
spinBtn.addEventListener("click", play);

spinBtn.style.display = "block";
spinBtn.style.margin = "0 auto";
spinBtn.style.fontSize = "25px";

creditButton.style.fontSize = "25px";

createCredPrompt();

function createCredPrompt(){
    if(credit <= 0) {
        spinBtn.style.visibility = "hidden";
        creditButton.style.visibility = "visible";
        let input = document.createElement("input"); // Create an input element
        if(!document.querySelector("#creditText")) {
            input.type = "number";
            input.id = "creditText";                        // Set the type attribute
            input.placeholder = "999";// Set the placeholder attribute
            input.style.fontSize = "25px";
            input.style.height = "50px";
            input.style.width = "100px";
            input.style.textAlign = "center";
            input.style.backgroundColor = "rgb(133, 41, 40)";
            input.style.color = "rgb(255,215,0)"
            creditPrompt.appendChild(input);  // Example: append it to the body
        }
    } else {
        creditPrompt.innerHTML = "";
        creditButton.style.visibility = "hidden";  // Makes the button invisible
        spinBtn.style.visibility = "visible";
    }
}

function setCreds(){
    if(credit <= 0) {
        credit = document.querySelector("#creditText").value;
        createCredPrompt();
        currCreds.innerText = "Credits : " + credit;
    }
}

function play(){
    if(credit - 100 < 0)
        credit = 0;
    else
        credit -= 100;
    createCredPrompt();

    currCreds.innerText = "Credits : " + credit;
    //clear images
    imageBox.innerHTML = "";
    let randNums = [];

    for(let i = 0; i < images.length; i++) {
        rand = Math.floor(Math.random() * 3); // create random number for slot image
        randNums.push(rand);

        let img = document.createElement("img"); //assign each image slot a random image
        img.src = images[rand];
        img.width = 200;
        img.height = 200;
        img.style.objectFit = "contain";
        img.style.padding = "20px";
        imageBox.appendChild(img);
    }

    for(let i = 0; i < 3; i++) {
        console.log(i + " : ");
        console.log(randNums[i]);
    }

    if(randNums[0] == randNums[1] && randNums[0] == randNums[2]) {
        credit += 1000;
        currCreds.innerText = "Credits : " + credit;
        message.innerText = "You Win!!";
    } else {
        message.innerText = "You Lost :(";
    }
}