import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "bryan-berry.tech",
    user: "bryanber_webuser",
    password: "cst-336",
    database: "bryanber_quotes",
    connectionLimit: 10,
    waitForConnections: true
});
const conn = await pool.getConnection();

//routes
app.get('/', (req, res) => {
   res.render('home');
});

app.get('/addAuthor', (req, res) => {
    res.render('addAuthor');
 });
app.post('/addAuthor', async (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let dob = req.body.dob;
    let dod = req.body.dod;
    let sex = req.body.sex;
    let profession = req.body.profession;
    let country = req.body.country;
    let portrait = req.body.portrait;
    let biography = req.body.biography;

    let sql = `INSERT INTO authors
    (firstName, lastName, dob, dod, sex, profession, country, portrait, biography)
    VALUES (?,?,?,?,?,?,?,?,?)`

    let params = [firstName, lastName, dob, dod, sex, profession, country, portrait, biography];
    const [rows] = await conn.query(sql, params);

    res.render('addAuthor');
 });

 app.get('/addQuote', (req, res) => {
    res.render('newQuote');
 });

 app.post('/addQuote', async (req, res) => {
    let quote = req.body.quote;
    let author = req.body.author;
    let category = req.body.category;


    let sql = `INSERT INTO quotes
    (quote, authorId, category)
    VALUES (?,?,?)`;

    let params = [quote, author, category];
    const [rows] = await conn.query(sql, params);

    res.render('newQuote');
 });

 app.get('/authors', async(req, res) => {

   let sql = `SELECT authorId, firstName, lastName
              FROM authors
              ORDER BY lastName`;
   const [authors] = await conn.query(sql);
   res.render('authors', {authors});
});

app.get('/author/edit', async(req, res) => {
   let authorId = req.query.authorId;  
   let sql = `SELECT *
              FROM authors
              WHERE authorId = ?`;
   const [authorData] = await conn.query(sql, [authorId]);
   res.render('editAuthor', {authorData});
});

app.post('/author/edit', async(req, res) => {

   //removed sex from all fields
   let authorId = req.body.authorId;
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let dob = req.body.dob;
   let dod = req.body.dod;
   let profession = req.body.profession;
   let country = req.body.country;
   let portrait = req.body.portrait;
   let biography = req.body.biography;

   let sql = `UPDATE authors
              SET firstName = ?,
              lastName = ?,
              dob = ?,
              dod = ?,
              profession = ?,
              country=?,
              portrait=?,
              biography = ?
              WHERE authorId = ?`;
   let params = [firstName, lastName, dob, dod, profession, country, portrait, biography, authorId];

   const [authorData] = await conn.query(sql, params);
   res.redirect('/authors');
});

app.listen(3001, ()=>{
    console.log("Express server running")
})

//INSERT INTO authors (firstName, lastName, biography) VALUES ('Albert', 'Einstein', 'TEST');