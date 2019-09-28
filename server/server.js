const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT;
// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('public'));



app.get('/authorize', (req, res) => {
    const response_type = 'code';
    const client_id = 'de91c8a755fa42c28803189462869a63';
    const redirect_uri = 'http://localhost:3000/api/spotify_login/spotify_redirect';
    const scope = 'user-read-private user-top-read user-read-currently-playing user-read-playback-state';
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`); 
})

app.get('/api/spotify_login/spotify_redirect', (req,res) => {
    // console.log(req.query);
    axios.post('http://accounts.spotify.com/api/token', {
        params: {
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: 'http://localhost:3000/api/spotify_login/spotify_redirect',
        },
        headers: {
            // Authorization: 'Basic' + 
        }
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    })

})
    

app.listen(port, () => console.log(`Example app listening on port ${port}!`))