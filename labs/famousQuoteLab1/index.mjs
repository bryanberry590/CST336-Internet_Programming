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
app.get('/', (req, res) => {
   res.render('home');
});

app.get('/allQuotes', async (req, res) => {
    let query = 'SELECT * FROM `quotes` ORDER BY `quote`';
    const [rows] = await conn.query(query);
    console.log(rows);

    res.render('allQuotes', { rows });
 });

 app.get('/allInspirationalQuotes', async (req, res) => {
    let query = 'SELECT * FROM `quotes` WHERE `category` = ?';
    let params = ['Inspirational']
    const [rows] = await conn.query(query,params);
    console.log(rows);

    res.render('allInspirationalQuotes', { rows });
 });

 app.get('/lifeQuotes', async (req, res) => {
    let query = 'SELECT * FROM `quotes` WHERE `quote` LIKE ?';
    let params = ['%life%']
    const [rows] = await conn.query(query, params);
    console.log(rows);

    res.render('lifeQuotes', { rows });
 });

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3001, ()=>{
    console.log("Express server running")
})