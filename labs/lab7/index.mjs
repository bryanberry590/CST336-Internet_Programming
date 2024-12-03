import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

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
app.get('/', async (req, res) => {
    let sql = `SELECT *
    FROM authors
    NATURAL JOIN quotes
    ORDER BY lastName`;
    const [rows] = await conn.query(sql);
   res.render('home.ejs', {rows, error: null});
});

app.get('/searchByKeyword', async (req, res) => {
    let userKeyword = req.query.keyword;
    console.log(userKeyword);
    let sql = `SELECT * 
               FROM quotes 
               NATURAL JOIN authors
               WHERE quote LIKE ?`;
    let sqlParams = [`%${userKeyword}%`];
    const [rows] = await conn.query(sql, sqlParams);
    if(!userKeyword || userKeyword.length < 3){
        let sql = `SELECT *
        FROM authors
        NATURAL JOIN quotes
        ORDER BY lastName`;
        const [rows] = await conn.query(sql);
        return res.render('home.ejs', {rows, error: "Keyword is too short"});
    }
    res.render("quotes.ejs", {rows});
 });

 app.get('/searchByAuthor', async (req, res) => {
    let userAuthor = req.query.authorMenu;
    console.log(userAuthor);
    let sql = `SELECT *
               FROM authors 
               INNER JOIN quotes ON authors.authorId = quotes.authorId
               WHERE authors.authorId = ?`;
    let sqlParams = [`${userAuthor}`];
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows});
 });

 app.get('/searchByCategory', async (req, res) => {
    let userCategory = req.query.categoryMenu;
    console.log(userCategory);
    let sql = `SELECT *
               FROM quotes 
               NATURAL JOIN authors
               WHERE category = ?`;
    let sqlParams = [`${userCategory}`];
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows});
 });
 
 app.get('/searchByLikes', async (req, res) => {
    let userLikes = req.query.likes;
    console.log(userLikes);
    let sql = `SELECT *
               FROM quotes 
               NATURAL JOIN authors
               WHERE likes = ?`;
    let sqlParams = [`${userLikes}`];
    const [rows] = await conn.query(sql, sqlParams);
    res.render("quotes.ejs", {rows});
 });

 app.get('/author', async (req, res) => {
    let userAuthor = req.query.authorId;
    let sql = `SELECT *
               FROM authors 
               WHERE authorId = ?`;
    let sqlParams = [`${userAuthor}`];
    const [rows] = await conn.query(sql, sqlParams);
    res.render("author.ejs", {rows});
 });

app.listen(3001, ()=>{
    console.log("Express server running")
})