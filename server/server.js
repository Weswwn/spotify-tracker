const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(morgan('dev'));
require('dotenv').config()
app.use(cors());
app.use(express.static('public'));
const querystring = require('querystring');


const port = process.env.PORT;

const response_type = 'code';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
console.log(client_id, client_secret);
const redirect_uri = 'http://localhost:3000/api/spotify_login/spotify_redirect';
const scope = 'user-read-private user-top-read user-read-currently-playing user-read-playback-state';
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
        console.log(response.data);
        res.redirect('http://localhost:3000/#' + querystring.stringify({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
        }));
    })
    .catch((error) => {

    })
})
    

app.listen(port, () => console.log(`Spotify app listening on port ${port}!`))