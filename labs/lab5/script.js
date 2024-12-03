document.querySelector("#translateBtn").addEventListener("click", translateBtn)
document.querySelector("#displayAuthor").addEventListener("click", displayAuthorBtn)

getQuote();
onLoad();
let currQuote;
let currAuthor;
let currBio;
let currImg;

//fetch a random background image from the api and set it
async function onLoad(){
    let randPhotoApi = await fetch("https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&featured=true&query=flowers");
    let randPhotoJson = await randPhotoApi.json();
    console.log(randPhotoJson);
    let imgUrl = randPhotoJson.raw;

    document.body.style.backgroundImage = `url${imgUrl}`;
    document.body.style.opacity = 0.5;
}

// fetch a random quote and add it to the top of the page
// save the quote  in a variable
async function getQuote(){
    let randQuoteApi = await fetch("https://webspace.csumb.edu/~lara4594/ajax/quotes/getRandomQuote.php")
    let randQuoteJson = await randQuoteApi.json();
    //console.log(randQuoteJson);
    currQuote = randQuoteJson.quoteText;
    currAuthor = randQuoteJson.firstName + " " + randQuoteJson.lastName;
    currBio = randQuoteJson.bio;
    currImg = randQuoteJson.picture;
    //console.log(currQuote);

    document.querySelector("#quote").innerText = currQuote;
    document.querySelector("#author").innerText = currAuthor;

}

function displayAuthorBtn(){
    document.querySelector("#bio").innerText = currBio;
    let authorImgBox = document.querySelector("#authorImg");
    let newImg = document.createElement("img");
    newImg.src = currImg;
    newImg.width = 300;
    newImg.height = 300;

    authorImgBox.appendChild(newImg);
}
//click the translate button
//   fetch the translated version of the quote of the day
//   corresponding language flag is displayed when clicking translate button

function translateBtn(){

}

//An error message in red is displayed if the value entered in the "Number 
//of Quotes" text box is not between 1 and 5 or if it's left blank