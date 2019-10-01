const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const axios = require('axios');
const app = express();
const cors = require('cors');
const { filterArtistData , formatArtistData } = require('./filter.js');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(morgan('dev'));
require('dotenv').config()
app.use(cors());
app.use(express.static('public'));
const querystring = require('querystring');
const client = require('../database/database.js');



const port = process.env.PORT;

const response_type = 'code';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/api/spotify_login/spotify_redirect';
const scope = 'user-read-private user-top-read user-read-currently-playing user-read-playback-state user-read-recently-played';
app.get('/authorize', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`); 
})


app.get('/api/spotify_login/spotify_redirect', (req,res) => {
    const params = `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    axios.post('https://accounts.spotify.com/api/token' , params, {
        headers: headers
    })
    .then((response) => {
        // console.log(response.data);  
        res.redirect('http://localhost:3000/#' + querystring.stringify({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
        }));
    })
    .catch((error) => {
        res.redirect('/#' + querystring.stringify({
            error: error
        }))
    })
})

//Receive Get Request to save data to database
app.put('/api/topArtists' , (req, res) => {
    const resultArray = filterArtistData(req.body.params.data);
    const queryString = 'INSERT INTO artists(userID, timeRange, arrayOfArtists) VALUES($1, $2, $3)'
    const values = [req.body.params.user.id, req.body.params.timeRange, JSON.stringify(resultArray)];
    client.query(queryString, values, (err, response) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(response);
        }
    })
    
})

app.get('/api/retrieve/topArtists' , (req, res) => {
    console.log('CHECKKKKK: ' , req.query);
    const queryString = 'SELECT * FROM artists where timeRange= $1 AND userID = $2'
    const values = [req.query.timeRange, req.query.userid]
    client.query(queryString, values, (err, response) => {
        if (err) {
            res.status(400).send(err);
        } else {
            // console.log(response.rows);
            var result = formatArtistData(response.rows);
            res.send(result);
        }
    })
})

app.post('/api/user' , (req, res) => {
    const queryString = 'INSERT INTO spotifyusers(userID, country) VALUES($1, $2)';
    const values = [req.body.params.id, req.body.params.country];
    client.query(queryString, values, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    })
})
    

app.listen(port, () => console.log(`Spotify app listening on port ${port}!`))