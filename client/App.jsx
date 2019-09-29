import React from 'react';
import TopSongs from './TopSongs.jsx';
import axios from 'axios';
import { BrowserRouter, Route, Link } from "react-router-dom";
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
import queryString from 'query-string';

class App extends React.Component {
    constructor(props) {
        super(props)
        const access_token = queryString.parse(location.hash).access_token;
        console.log(access_token);
        this.state = {
            loggedin: access_token ? true : false,
            topArtists: null,
            topTracks: null,
            nowPlaying: null
        }
        if (access_token) {
            spotifyApi.setAccessToken(access_token);
        }
    }
    
    test() {
        // console.log(queryString.parse(location.hash).access_token)
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
            return (
                <div className="container">
                {!this.state.loggedin ? <a href="/authorize">
                    <button >Authorize Spotify Connection</button>
                </a> : null}
                <button onClick={this.test}>GET ALL THE FUCKIN DATA</button>
            </div>
        )
    }
    
}

export default App;