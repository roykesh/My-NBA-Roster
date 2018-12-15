const express = require('express')
const path = require('path')
const app = express()
const request = require('request')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.get('/teams/:teamName', (req, res) => {
    request(`http://data.nba.net/10s/prod/v1/2018/players.json`, (err, response) => {
        let parsedResponse = JSON.parse(response.body)
        let allPlayersArray = parsedResponse.league.standard
        let preFiltArr = allPlayersArray
            .filter(p => p.teamId === teamToIDs[req.params.teamName])
            .filter(p => p.isActive);
        let filteredArray = []
        preFiltArr.forEach(p => {
            filteredArray.push({
                firstName: p.firstName,
                lastName: p.lastName,
                jersey: Number(p.jersey),
                pos: p.pos
            })
        });
        res.send(filteredArray)
    })
})

// Working route
app.get('/players', (req, res) => {
    request(`http://data.nba.net/10s/prod/v1/2018/players.json`, (err, response) => {
        let parsedResponse = JSON.parse(response.body)
        let allPlayersArray = parsedResponse.league.standard
        res.send(allPlayersArray)
    })
})

app.get('/sanity', (req, res) => {
    console.log("Someone is here. The prophecy is upon us")
    res.send("OK")
})

const port = 3005
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})
