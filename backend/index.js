const express = require('express')
const cors = require('cors');
const configureDB = require('./config/database')
const router = require('./config/routes')
const path = require('path')

const port = 4100

const app = express()
app.use(cors());
app.use(express.json())
configureDB()
app.use('/', router)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, function(){
    console.log('server is running on port', port)
})