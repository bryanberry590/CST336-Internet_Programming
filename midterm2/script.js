onLoad();
document.querySelector("#submitBtn").addEventListener("click", submit)


let heroes = [];
let currHeroName = "";
let currFirstName;
let currLastName;
let currImg;

async function onLoad(){
    let randPhotoApi = await fetch("https://csumb.space/api/superheroesAPI.php");
    console.log(randPhotoApi);
    let randPhotoJson = await randPhotoApi.json();

    let dropdown = document.querySelector("#q1Choices");
    let newOption;

    for(let i = 0; i < randPhotoJson.length; i++){
        heroes.push(randPhotoJson[i]);
        console.log(heroes[i]);
        newOption = document.createElement("option");
        newOption.innerText = heroes[i].firstName + " " + heroes[i].lastName;
        dropdown.appendChild(newOption);
    }

    currImg = heroes[0].image;
    currHeroName = heroes[0].name;
    currFirstName = heroes[0].firstName;
    currLastName = heroes[0].lastName;

    let newImg = document.querySelector("#heroImg");
    newImg.src = "img/" + currImg + ".png";
}


async function submit(){
    let q1Answer = document.querySelector("#q1Choices").value;
    let response = document.querySelector("#response");

    if(q1Answer == currFirstName + " " + currLastName){
        response.innerText = "GREAT JOB";
        response.style.color = "green";
    } else{
        response.innerText = "WRONG";
        response.style.color = "red";
    }
}



