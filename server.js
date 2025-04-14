console.log("Hey Hallo wereld")
//npm run dev zodat we niet opnieuw hoeven te typen

import express, { request } from 'express'
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
    response.render('index.liquid')
})

// --------------------------

app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})