document.querySelector("#stateSelect").addEventListener("change", getCounty);
document.querySelector("#usernameInput").addEventListener("input", usernameCheck);
document.querySelector("#pwBox").addEventListener("focus", generatePw);
document.querySelector("#submitBtn").addEventListener("click", submitCheck);

document.querySelector("#thanksMsg").innerText = "";
document.querySelector("#pwMsg2").innerText = "";


getStates();

let zipCodeInput = document.querySelector("#zipCodeInput");

zipCodeInput.addEventListener("input", async function(){
    let zipCodeResult = await fetch("https://csumb.space/api/cityInfoAPI.php?zip=" + zipCodeInput.value);

    let zipResult = await zipCodeResult.json();
    console.log(zipResult);
    if(zipResult.city == undefined) {
        document.querySelector("#failMsg").innerText = "Zip Code Not Found";
        document.querySelector("#cityName").innerText = "";
        document.querySelector("#lat").innerText = "";
        document.querySelector("#long").innerText = "";
    } else {
        document.querySelector("#failMsg").innerText = "";
        document.querySelector("#cityName").innerText = zipResult.city;
        document.querySelector("#lat").innerText = zipResult.latitude;
        document.querySelector("#long").innerText = zipResult.longitude;
    }
    
});

function submitCheck(){
    let check = true;
    let cont = true;
    document.querySelector("#pwMsg2").innerText = "";
    document.querySelector("#pwMsg2").style.color = "red";

    if(document.querySelector("#usernameInput").value.length < 3) {
        //username not long enough msg
        document.querySelector("#usernameMsg").innerText = "Username not long enough";
        check = false;
    }
    if(document.querySelector("#pwBox").value.length < 6) {
        //password not long enough msg
        document.querySelector("#pwMsg2").innerText = "Password not long enough";
        if(document.querySelector("#pwBox").value != document.querySelector("#pwBox2").value){
            // passwords don't match msg
            document.querySelector("#pwMsg2").innerText += " and does not match";
            cont = false;
        }
        check = false;
    }
    if(document.querySelector("#pwBox").value != document.querySelector("#pwBox2").value && cont){
        // passwords don't match msg
        document.querySelector("#pwMsg2").innerText += "Passwords do not match";
        check = false;
    }
    if(check){
        //thank you for signing up msg
        document.querySelector("#thanksMsg").innerText = "Thank you for signing up!";
    }

}

async function generatePw(){
    let randPw = await fetch("https://csumb.space/api/suggestedPassword.php?length=8");
    let pw = await randPw.json();
    console.log(pw);

    let passwordSuggestion = document.querySelector("#pwMsg");

    passwordSuggestion.innerText = "Suggested Password: " + pw.password;




}

async function usernameCheck(){
    let inputName = document.querySelector("#usernameInput").value;
    let usernameResult = await fetch(`https://csumb.space/api/usernamesAPI.php?username=${inputName}`);

    let usernameAvail = await usernameResult.json();

    let usernameMsg = document.querySelector("#usernameMsg");

    if(usernameAvail.available) {
        usernameMsg.innerText = "This username is available";
        usernameMsg.style.color = "Green";
    } else {
        usernameMsg.innerText = "This username is NOT available";
        usernameMsg.style.color = "Red";
    }

}

async function getStates(){
    let stateResult = await fetch("https://csumb.space/api/allStatesAPI.php");
    console.log(stateResult);

    let states = await stateResult.json();
    console.log(states);

    let stateSelect = document.querySelector("#stateSelect");
    console.log(states[0]);

    for(let i = 0; i < states.length; i++) {
        let stateOption = document.createElement("option");
        stateOption.id = states[i].usps;
        stateOption.value = states[i].usps;
        stateOption.textContent = states[i].state;
    
        stateSelect.appendChild(stateOption);
    }

}

async function getCounty(){
    let stateSelect = document.querySelector("#stateSelect");

    let countyResult = await fetch(`https://csumb.space/api/countyListAPI.php?state=${stateSelect.value}`);
    console.log(countyResult);

    let counties = [];
    counties = await countyResult.json();
    console.log(counties);

    let countySelect = document.querySelector("#countySelect");
    console.log(counties[0]);
    document.querySelector("#countySelect").innerText= "";
    for(let i = 0; i < counties.length; i++) {
        let countyOption = document.createElement("option");
        countyOption.value = counties[i].county;
        countyOption.textContent = counties[i].county;
    
        countySelect.appendChild(countyOption);
    }

}
