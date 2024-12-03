

document.querySelector("form").addEventListener("submit", validateAuthor);

function validateAuthor(event){
    let fName = document.querySelector("input[name=firstName]").value; // if no id, then (input[name=firstName]).value;
    let lName = document.querySelector("input[name=lastName]").value; // if no id, then (input[name=firstName]).value;
    let age = document.querySelector("input[name=age]").value; // if no id, then (input[name=firstName]).value;
    let username = document.querySelector("input[name=username]").value; // if no id, then (input[name=firstName]).value;
    let password = document.querySelector("input[name=password]").value; // if no id, then (input[name=firstName]).value;

    let isValid = true;

    if(fName.length) {
        alert("fields are left empty");
        isValid = false;
    }

    if(!isValid){
        event.preventDefault(); // prevents form submission
    }
}