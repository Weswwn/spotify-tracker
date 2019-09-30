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
        this.state = {
            loggedin: access_token ? true : false,
            topArtists: [],
            topTracks: [],
            nowPlaying: {}
        }
        if (access_token) {
            spotifyApi.setAccessToken(access_token);
        }
        this.getCurrentPlaybackState = this.getCurrentPlaybackState.bind(this);
        this.getTopArtists = this.getTopArtists.bind(this);
        this.getTopTracks = this.getTopTracks.bind(this);
    }
    
    getCurrentPlaybackState() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                console.log(response);
                this.setState({
                    nowPlaying: response
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getTopArtists() {
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

    getTopTracks() {
        spotifyApi.getMyTopTracks()
            .then((response) => {
                console.log(response);
                this.setState({
                    topTracks: response.items
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
                    </a> 
                    : 
                    <div>
                        <div className="current-playback">
                            <button className="btn btn-outline-secondary" onClick={this.getCurrentPlaybackState}>View Current Stream Stats</button>
                            <CurrentPlayback getPlayback={this.getCurrentPlaybackState} playbackState={this.state.nowPlaying}/>
                        </div>

                        <div className="container">
                            <div className="top-tracks"><h3>Top Tracks {<button type="button" class="btn btn-outline-secondary" onClick={this.getTopTracks}>Update list!!</button>}</h3>
                        <TopTracks getTopTracks={this.getTopTracks} topTracks={this.state.topTracks}/></div>
                        
                            <div className="top-artists"><h3>Top Artists {<button class="btn btn-outline-secondary" onClick={this.getTopArtists}>Update List!!</button> }</h3><TopArtists getTopArtists={this.getTopArtists} topArtists={this.state.topArtists}/></div>
                        </div>
                    </div>
                    }

                </div>
        )
    }
    
}

export default App;