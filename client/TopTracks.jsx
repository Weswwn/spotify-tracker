import React from 'react';
import TopTracksEntry from './TopTracksEntry.jsx';

class TopTracks extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div key={this.props.topTracks.href} className="tracks-list">
                {this.props.topTracks.length === 0 ? 'No tracks!' : this.props.topTracks.map((track) => <TopTracksEntry key={track.id} track={track}/>)}
            </div>
        )
    }
    
}

export default TopTracks;