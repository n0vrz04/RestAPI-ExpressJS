const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const mainRouter = require('./routes/index')
const app = express()
const PORT = process.env.PORT || 3009
const methodOverride = require('method-override')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(methodOverride('_method'));

app.use('/' , mainRouter)

app.listen(PORT,()=>{
    console.log(`Server Listens Port:${PORT}`);
})