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
    user: "bryanber_finalUser",
    password: "cst-336",
    database: "bryanber_finalProject",
    connectionLimit: 10,
    waitForConnections: true
});
const conn = await pool.getConnection();

//session variables


//routes
app.get('/', (req, res) => {
   res.render('login', { errorCheck: false, message: 'none'});
});

app.post('/login', async (req,res) => {
    //fix the login page to work with any created account, this means, will have to hash password, compare it against all passwords in the database
    // if that user exists with the matching hashed password, then let them log in.
    // also will probably have to loop through all the users from the users database in order
    // to compare the hashed password the user entered to see if they exist in the database
    let username = req.body.username;
    let password = req.body.password;

    let passwordHash = "";
    let errorCheck = false;

    let sql = `SELECT * 
               FROM Users 
               WHERE username = ?`
    const [rows] = await conn.query(sql, username);
    if(rows.length > 0){ // if found at least one record
        //passwordHash = rows[0].password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);        // console.log(passwordHash);
        const user = rows[0];
    
        let match = await bcrypt.compare(password, hashedPassword);
        if(match){
            errorCheck = false;
            req.session.authenticated = true;
            req.session.user = user;

            return res.render('welcome', {errorCheck, message: 'none', user});
        }
    }
    errorCheck = true;
    res.render('login', { errorCheck , message: 'Try Again'});
});

app.post('/createAccount', async (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;


    
    if(username == undefined || password  == undefined || firstName  == undefined || lastName  == undefined || age == undefined ){
        res.render('createAccount');
    } else {
        //convert users password to a bcrypt hash then insert it into the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //sql code to insert user info into the users database, still missing the wishlist information
        let sql = `INSERT INTO Users
                   (firstName, lastName, age, username, password)
                   VALUES (?,?,?,?,?)`;

        let params = [firstName, lastName, age, username, hashedPassword];
        const [rows] = await conn.query(sql, params);

        //sql code to select the user that was just inserted
        let userSql = `SELECT *
                       FROM Users
                       WHERE firstName = ?`;
        let userParams = [firstName];
        const [userInfo] = await conn.query(userSql, userParams);
        
        // sql code to insert a new wishlist into the wishlist database for the new user's customerId
        let newWlSql = `INSERT INTO wishlist
                           (customerId)
                           VALUES (?)`;
        let wishlistParams = [userInfo[0].customerId];
        const [wishlistInfo] = await conn.query(newWlSql, wishlistParams);
        
        //sql code to select the newly created wishlist for the new user
        let wishlistSql = `SELECT *
                           FROM wishlist
                           WHERE customerId = ?`;
        let newWlParams = [userInfo[0].customerId];
        const [userWl] = await conn.query(wishlistSql, newWlParams);
        
        //sql code to update the just created users wishlist field with the correct wihslist Id based off what was just created
        let updateUserSql = `UPDATE Users
                             SET wishlist = ?
                             WHERE username = ?`;
        let updateUserParams = [ userWl[0].wishlistId, userInfo[0].username ];
        const [updateUser] = await conn.query(updateUserSql, updateUserParams);

        res.render('login', { errorCheck: true , message: 'Account Created, Login With Your Account.' });
    }


});

app.get("/welcome",isAuthenticated, async(req, res) =>{
    const user = req.session.user; 

    res.render('welcome', {user});
});

app.get("/profile", isAuthenticated, async(req, res) => {
    const user = req.session.user;

    res.render('profile', {user});
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

app.listen(3002, ()=>{
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