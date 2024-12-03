document.querySelector("#addBtn").addEventListener("click", addPet);
document.querySelector("#showPets").addEventListener("click", showPet);

let pets = ["Dog", "Cat", "Hamster"];
let petArrText = document.querySelector("#petArr")


for(let i = 0; i < pets.length - 1; i++) {
    petArrText.innerText += " " + pets[i] + ", ";
}
petArrText.innerText += " " + pets[pets.length-1]

function addPet(){
    let petInput = document.querySelector("#inputBox");
    let newPet = petInput.value;

    pets.unshift(newPet);
    
    petArrText.innerText = "Pet Array: ";


    for(let i = 0; i < pets.length - 1; i++) {
        petArrText.innerText += " " + pets[i] + ", ";
    }
    petArrText.innerText += " " + pets[pets.length-1]
}

function showPet(){
    let shuffleCheck = document.querySelector("#shuffle");
    let numInput = document.querySelector("#numInput");
    if(numInput.value > pets.length || numInput.value < 0) {
        document.querySelector("#errMsg").innerText = "Invalid Input";
    } else {
        let numToDisplay = document.querySelector("#numInput").value;
        document.querySelector("#errMsg").innerText = "";
        if(shuffleCheck.checked) {
            pets = _.shuffle(pets);

            document.querySelector("#listPets").innerHTML = "";
            
            for(let i = 0; i < numToDisplay; i++) {
                let inputElement = document.createElement("input");
                inputElement.name = "q2";
                inputElement.type = "radio";
                inputElement.value = pets[i];
                console.log(inputElement);
    
                let labelElement = document.createElement("label");
                labelElement.innerText = pets[i];
        
                labelElement.prepend(inputElement);
    
                document.querySelector("#listPets").appendChild(labelElement);
            }

        }else{
            document.querySelector("#listPets").innerHTML = "";
            pets.sort();

            for(let i = 0; i < numToDisplay; i++) {
                let inputElement = document.createElement("input");
                inputElement.name = "q2";
                inputElement.type = "radio";
                inputElement.value = pets[i];
                console.log(inputElement);
    
                let labelElement = document.createElement("label");
                labelElement.innerText = pets[i];
        
                labelElement.prepend(inputElement);
    
                document.querySelector("#listPets").appendChild(labelElement);
            }
        }
    }
}