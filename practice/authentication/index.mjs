import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//initializing sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

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

//session variables


//routes
app.get('/', (req, res) => {
   res.render('login');
});

app.post('/login', async (req,res) => {
    let username = req.body.username;
    let password = req.body.password;

    let passwordHash = "";

    let sql = `SELECT * 
               FROM admin 
               WHERE username = ?`
    const [rows] = await conn.query(sql, [username]);
    if(rows.length > 0){ // if found at least one record
        passwordHash = rows[0].password;
    }
    let match = await bcrypt.compare(password, passwordHash);
    if(match){
        req.session.fullName = rows[0].firstName + " " + rows[0].lastName;
        req.session.authenticated = true;
        res.render('welcome');
    } else {
        res.redirect('/');
    }
});

app.get("/profile", isAuthenticated, async(req, res) => {
        res.render('profile');
});

app.get("/settings", isAuthenticated, async(req, res) => {
        res.render('settings');
});

app.get("/logout", async(req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});

app.listen(3001, ()=>{
    console.log("Express server running")
})

//Middleware functions
function isAuthenticated(req, res, next){
    if(req.session.authenticated){
        next();
    } else {
        res.redirect("/");
    }
}