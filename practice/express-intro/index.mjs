import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


//routes
app.get('/', (req, res) => {
   //res.send('Hello Express app!')
   res.render("home");
});

app.get('/quote', async (req, res) => {
    let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);  
    res.render("randomQuote", {"quote": data.quoteText, "by": data.firstName });
 });


// 3000 is the port number for "localhost:3000" in browser
app.listen(3000, () => {
   console.log('server started');
});