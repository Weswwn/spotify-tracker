import React from 'react';
import TopArtistsEntry from './TopArtistsEntry.jsx';

class TopArtists extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div key={this.props.topArtists.href} className="artists-list">
                {this.props.topArtists.length === 0 ? 'No Artists!' : this.props.topArtists.map((artist) => <TopArtistsEntry key={artist.id} artist={artist}/>)}
            </div>
        )
    }
    
}

export default TopArtists;