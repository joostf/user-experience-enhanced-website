//npm run dev zodat we niet opnieuw hoeven te typen

import express, { request, response } from 'express'
import { Liquid } from 'liquidjs';

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

// ----------Routes op de website------------

// MARK: Home
app.get("/", (request, response) => {
    // connectie met directus met een fetch
    // query uitvoeren met het ophalen van de data
    // data controlen en filteren
    // bewerking uitvoeren op data
    // data doorgeven aan template
    response.render('index.liquid')
})

// MARK: Stories
app.get("/stories", (request, response) =>{
    // connectie met directus met een fetch
    // query uitvoeren met het ophalen van de data
    // data controlen en filteren
    // bewerking uitvoeren op data
    // data doorgeven aan template
})

// --------------MARK: Test---------
app.get("/image", (request, response) =>{
    response.render("image.liquid")
})

app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})