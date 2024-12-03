import express from 'express';
const planets = (await import('npm-solarsystem')).default;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
   res.render('home')
});

app.get('/planet', (req, res) => {
    let planet = req.query.planetName;
    res.render('home');
})

app.get('/mercury', (req, res) => {
    let mercuryInfo = planets.getMercury();
    res.render('mercury', {'mercuryData' : mercuryInfo});
})

app.get('/venus', (req, res) => {
    let venusInfo = planets.getVenus();
    res.render('venus', {'venusData' : venusInfo});
})

app.get('/mars', (req, res) => {
    console.log(planets.getMars());
    let marsInfo = planets.getMars(); 
    res.render('mars', {'marsData' : marsInfo});
})

app.get('/saturn', (req, res) => {
    let saturnInfo = planets.getSaturn();
    res.render('saturn', {'saturnData' : saturnInfo});
})

app.get('/earth', (req, res) => {
    let earthInfo = planets.getEarth();
    res.render('earth', {'earthData' : earthInfo});
})

app.get('/jupiter', (req, res) => {
    let jupiterInfo = planets.getJupiter();
    console.log(jupiterInfo);
    res.render('jupiter', {'jupiterData' : jupiterInfo});
})

app.get('/uranus', (req, res) => {
    let uranusInfo = planets.getUranus();
    res.render('uranus', {'uranusData' : uranusInfo});
})

app.get('/neptune', (req, res) => {
    let neptuneInfo = planets.getNeptune();
    res.render('neptune', {'neptuneData' : neptuneInfo});
})

app.get('/planetInfo', (req, res) => {

    let body = req.query.selectBody;
    let bodyInfo = null;

    if(body === "Comets"){
        bodyInfo = planets.getComets();
    } else if(body === "Asteroids"){
        bodyInfo = planets.getAsteroids();
    }else{

    }

    res.render('celestialBody', {'celestialBodyInfo' : bodyInfo});
})

app.get('/nasa', async (req, res) => {
    let month = req.query.monthSelect;
    let day = req.query.daySelect;
    let year = req.query.yearSelect;
    
    //console.log("Month: " + month + " Day: " + day + " Year: " + year);

    // Format the date as YYYY-MM-DD
    let selectedDate 

    let nasaApiUrl;
    if(year == undefined | day == undefined | month == undefined) {
        let currentDate = new Date();

        year = currentDate.getFullYear();
        month = String(currentDate.getMonth() + 1).padStart(2, '0');
        day = String(currentDate.getDate()).padStart(2, '0');

        selectedDate = `${year}-${month}-${day}`;

        nasaApiUrl = `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=gKNz9kTzew63XUuDUCVVkno1wl7J6dw2U4VGYXJ6`;
    } else{
        selectedDate = `${year}-${month}-${day}`;
        nasaApiUrl = `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=gKNz9kTzew63XUuDUCVVkno1wl7J6dw2U4VGYXJ6`;
    }

    // NASA API URL with the selected date and your API key
    //const nasaApiUrl = `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=gKNz9kTzew63XUuDUCVVkno1wl7J6dw2U4VGYXJ6`;
    let response = await fetch(nasaApiUrl);
    let data = await response.json();

    console.log(data);

    res.render('nasa', {"image": data});
})

// app.get('/quote', async (req, res) => {
//     let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data);  
//     res.render("randomQuote", {"quote": data.quoteText, "by": data.firstName });
//  });

app.listen(10012, () => {
   console.log('server started');
});
