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
            nowPlaying: {},
            trackTimeRange: 'long_term',
            artistTimeRange: 'long_term'
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

    getTopArtists(e) {
        e.preventDefault();
        //Define what time frame we want here using: {time_range: 'long_term'}
        spotifyApi.getMyTopArtists({time_range: this.state.artistTimeRange})
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

    getTopTracks(e) {
        e.preventDefault();
        spotifyApi.getMyTopTracks({time_range: this.state.trackTimeRange})
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

    handleChange(e) {
        console.log(e.target.id);
        if (e.target.id === 'track-select') {
            this.setState({
                trackTimeRange: e.target.value
            })
        }
        if (e.target.id === 'artist-select') {
            this.setState({
                artistTimeRange: e.target.value
            })
        }
    }

    render() {
            return (
                <div className="container">
                    {!this.state.loggedin ? <a href="/authorize">
                        <button className="btn btn-outline-secondary">Authorize Spotify Connection</button>
                    </a> 
                    : 
                    <div>
                        <div className="current-playback">
                            <button className="btn btn-outline-secondary" onClick={this.getCurrentPlaybackState}>View Current Stream Stats</button>
                            <CurrentPlayback getPlayback={this.getCurrentPlaybackState} playbackState={this.state.nowPlaying}/>
                        </div>

                        <div className="container">
                            <form onSubmit={(e) => this.getTopTracks(e)} >
                                <select id="track-select" onChange={(e) => this.handleChange(e)}>
                                    <option value="long_term">Of All Time</option>
                                    <option value="medium_term">Last Six Months</option>
                                    <option value="short_term">Last Four Weeks</option>
                                </select>
                                <div className="top-tracks"><h3>Top Tracks {<input value="Update Tracks!" type="submit" class="btn btn-outline-secondary" />}</h3> 
                                <TopTracks topTracks={this.state.topTracks}/></div>
                             </form>

                            <form onSubmit={(e) => this.getTopArtists(e)}>
                                <select id="artist-select" onChange={(e) => this.handleChange(e)}>
                                    <option value="long_term">Of All Time</option>
                                    <option value="medium_term">Last Six Months</option>
                                    <option value="short_term">Last Four Weeks</option>
                                </select>
                                <div className="top-artists"><h3>Top Artists {<input value="Update Artists!" type="submit" class="btn btn-outline-secondary"/>}</h3>
                                <TopArtists getTopArtists={this.getTopArtists} topArtists={this.state.topArtists}/></div>
                            </form>
                        </div>
                    </div>
                    }

                </div>
        )
    }
    
}

export default App;