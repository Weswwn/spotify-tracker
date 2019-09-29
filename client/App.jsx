import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link } from "react-router-dom";
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
import queryString from 'query-string';

import TopTracks from './TopTracks.jsx';
import CurrentPlayback from './CurrentPlayback.jsx';
import TopArtists from './TopArtists.jsx';

class App extends React.Component {
    constructor(props) {
        super(props)
        const access_token = queryString.parse(location.hash).access_token;
        console.log(access_token);
        this.state = {
            loggedin: access_token ? true : false,
            topArtists: [],
            topTracks: [],
            nowPlaying: []
        }
        if (access_token) {
            spotifyApi.setAccessToken(access_token);
        }
        this.getCurrentPlaybackState = this.getCurrentPlaybackState.bind(this);
        this.getTopArtists = this.getTopArtists.bind(this);
    }
    
    getCurrentPlaybackState() {
        // console.log(queryString.parse(location.hash).access_token)
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getTopArtists() {
        // console.log(queryString.parse(location.hash).access_token)
        spotifyApi.getMyTopArtists()
            .then((response) => {
                console.log(response);
                this.setState({
                    topArtists: response.items
                })
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
                    </a> : 
                    <div>
                        <CurrentPlayback getCurrentPlaybackState={this.getCurrentPlaybackState}/>
                        <TopTracks />
                        <TopArtists getTopArtists={this.getTopArtists} topArtists={this.state.topArtists}/>
                    </div>
                    }

                </div>
        )
    }
    
}

export default App;