import { shuffle } from 'fast-shuffle'
import fetch from 'node-fetch';

const quotes = (await import("success-motivational-quotes")).default;

console.log("Hello World!");
let letters = ["a", "b", "c", "d", "e",];
const shuffledLetters = shuffle(letters);

let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
let response = await fetch(url);
let data = await response.json();
console.log(data);

console.log(letters);
console.log(shuffledLetters);

const displayQuote = function(){
    console.log(quotes.getTodaysQuote());
}

displayQuote();

function displayQuote_Declaration(){
    console.log(quotes.getTodaysQuote());
}


