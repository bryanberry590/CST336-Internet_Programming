import express from 'express';
import fetch from 'node-fetch';
import { default as generate } from 'ricknmortyquotes';
const rnm = await fetch(`https://rickandmortyapi.com/api`);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

//routes
app.get('/', async (req, res) => {
    const randQuote = generate(); 
    console.log(randQuote);
    res.render('home', { quote: randQuote });
});

app.get('/character', async (req, res) =>{
    let charUrl = `https://rickandmortyapi.com/api/character`;
    let allCharacters = [];
    let count = 0;
    let rnmResponse;

    let filterBoolean = false;
    if(req.query.status !== 'null' || req.query.gender !== 'null' || req.query.species !== 'null') {
        filterBoolean = true;
    }

    const queryParams = new URLSearchParams();
    queryParams.append('status', req.query.status);
    queryParams.append('gender', req.query.gender);
    queryParams.append('species', req.query.species);

    while (charUrl != null) {
        if(count == 0) {
            rnmResponse = await fetch(`${charUrl}?${queryParams.toString()}`);
        }else{
            rnmResponse = await fetch(charUrl);
        }
        count++;
        let characterData = await rnmResponse.json();
        if(characterData.results){
            allCharacters = allCharacters.concat(characterData.results);
        }
        charUrl = characterData.info ? characterData.info.next : null;
    }

    res.render('character.ejs', { characters: allCharacters , filterCheck: filterBoolean});
});

app.get('/location', async (req, res) =>{
    let allLocations = [];
    let locNextPage = `https://rickandmortyapi.com/api/location`;

    while (locNextPage != null) {
        let rnmResponse = await fetch(locNextPage);
        let locationData = await rnmResponse.json();

        allLocations = allLocations.concat(locationData.results);
        locNextPage = locationData.info.next;
    }

    res.render('locations.ejs', { locations: allLocations });


});

app.get('/episode', async (req, res) =>{
    let userInput = req.query.episodeNum;

    if (userInput >= 1 && userInput <= 51) {
            let response = await fetch(`https://rickandmortyapi.com/api/episode/${userInput}`);
            let episodeData = await response.json();
            res.render('episodes', { episode: episodeData });
    } else {
        res.render('episodes', { episode: null });
    }
});

app.listen(3002, ()=>{
    console.log("Express server running")
})