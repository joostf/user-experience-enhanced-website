import express from 'express'

import { Liquid } from 'liquidjs';

const app = express()

// hier is mijn lijst van links die ik ga gebruiken in dit project
const api = "https://fdnd-agency.directus.app/items/tm_"
const api_users = "users"
const api_profile = "profile"
const api_buddy = "buddy"
const api_lang = "language"
const api_audio = "audio"
const api_playlist = "playlist"
const api_story = "story"
const api_animal = "animal"
const api_season = "season"

// hier fetch ik naar de api
const usersResponse = await fetch(`${api}${api_users}`)
const profileResponse = await fetch(`${api}${api_profile}`)
const buddyResponse = await fetch(`${api}${api_buddy}`)
const languageResponse = await fetch(`${api}${api_lang}`)
const audioResponse = await fetch(`${api}${api_audio}`)
const playlistResponse = await fetch(`${api}${api_playlist}`)
const storyResponse = await fetch(`${api}${api_story}`)
const animalReponse = await fetch(`${api}${api_animal}`)

// Hier haal ik de data terug als JSON data
const usersResponseJSON = await usersResponse.json()
const profileResponseJSON = await profileResponse.json()
const buddyResponseJSON = await buddyResponse.json()
const languageResponseJSON = await languageResponse.json()
const audioResponseJSON = await audioResponse.json()
const playlistResponseJSON = await playlistResponse.json()
const storyResponseJSON = await storyResponse.json()
const animalReponseJSON = await animalReponse.json()



app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

// ----------------------------------------------MARK: Landingspagina----------------------------------------------
app.get('/', async function (request, response) {
  // hier zet ik mijn verhalen neer 
  const storyResponse = await fetch(`${api}${api_story}`)  
  const playlistResponse = await fetch(`${api}${api_playlist}`)

  // ik wil bekijken of de juiste stories worden opgehaald
  const storyResponseJSON = await storyResponse.json()
  const playlistResponseJSON = await playlistResponse.json()

  // console.log(storyResponseJSON)

  response.render('index.liquid', 
    {stories: storyResponseJSON.data,
     playlists: playlistResponseJSON.data
    })
})

// MARK: Playlist maken
// hier voeg ik een post request toe om een nieuwe playlist te maken en toe te voegen bij de bestaande playlists
app.post('/', async function (request, response) {
  // eerst fetch ik naar de juiste informatie
  const results = await fetch('https://fdnd-agency.directus.app/items/tm_playlist',{
    method: 'POST',
    body: JSON.stringify({
      title: request.body.title
    }),
    headers: {
      'Content-type':'application/json;charset=UTF-8'
    }
  });
  // console.log(results)
  response.redirect(303, '/')
})

// Hiermee verwijder je een playlist die is gemaakt
app.post('/delete/:id', async function (request, response) {
  // console.log(request.body)

  const deleteplaylist = await fetch(`https://fdnd-agency.directus.app/items/tm_playlist/${request.params.id}`,{
    method: 'DELETE',

  });
  // console.log(deleteplaylist)

  response.redirect(303, '/')
})


// ----------------------------------------------MARK: Detailpagina----------------------------------------------
app.get('/stories/:id', async function (request, response) {
  // hier haal ik de verhalen op uit de database
  const storyResponse = await fetch(`${api}${api_story}/?filter={"id":"${request.params.id}"}`)
  const storyResponseJSON = await storyResponse.json()
  
  const audioResponse = await fetch(`${api}${api_audio}/?filter={"id":"${request.params.id}"}`)
  const audioResponseJSON = await audioResponse.json()
  // console.log(storyResponseJSON)
  // Hier haal ik de buddies uit de database
  const animalReponse = await fetch(`${api}${api_animal}/?filter={"id":"${request.params.id}"}`)
  const animalReponseJSON = await animalReponse.json()
  // console.log(animalReponseJSON), 
  // console.log(audioResponseJSON)

  // Hier render ik de verhalen en de buddies
  response.render('story.liquid', {story: storyResponseJSON.data[0], buddy: animalReponseJSON.data[0], audio: audioResponseJSON.data[0]})
})
app.set('port', process.env.PORT || 1337
)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
