require('dotenv').config()


const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 5000

const path = require('path');
app.use(express.static(path.join(__dirname, './dist/front-end')));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.use(cors({
    origin: "*"
}))
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
//app.use(express.json())
//app.use(express.urlencoded({extended: true}))


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))

const employeesRouter = require('./routes/employees')
app.use('/Employees', employeesRouter)
const projectsRouter = require('./routes/projects')
app.use('/Projects', projectsRouter)


app.listen(port, () => console.log('Server Started'))
app.get("/", (req, res) => {
    res.send({ message: "Yay" });
  });