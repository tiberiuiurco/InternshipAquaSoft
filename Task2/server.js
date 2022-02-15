require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors({
    origin: "*"
}))


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))

app.use(express.json())

const employeesRouter = require('./routes/employees')
app.use('/Employees', employeesRouter)
const projectsRouter = require('./routes/projects')
app.use('/Projects', projectsRouter)


app.listen(port, () => console.log('Server Started'))
app.get("/", (req, res) => {
    res.send({ message: "Yay" });
  });