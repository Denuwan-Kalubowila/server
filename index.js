const express = require('express')
const router = require('./routes/router')
const app = express()
const port=8000
const bodyParser = require('body-parser');
const cors=require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const corsOrigin='http://localhost:3000'
app.use(cors({
    origin:[corsOrigin],
    methods:['GET','POST'],
    credentials:true,
}))
app.use('/',router)

app.listen(port,()=>{
    console.log("hi")
    console.log(`Server is running on port ${port}`);
})