import React from 'react';
import TopArtistsEntry from './TopArtistsEntry.jsx';

class TopArtists extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="songs-list">
                <h3>Top Artists</h3>
                <div><button onClick={this.props.getTopArtists}>Update List!!</button></div>
                {this.props.topArtists.length === 0 ? 'No Artists!' : this.props.topArtists.map((artist) => <TopArtistsEntry artist={artist}/>)}
            </div>
        )
    }
    
}

export default TopArtists;