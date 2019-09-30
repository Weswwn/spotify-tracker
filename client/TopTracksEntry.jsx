import React from 'react';

class TopTracksEntry extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.track);
        return (
            <div className="top-tracks-entry">
                <div key={this.props.track.id}>
                    <div>{this.props.track.name}</div>
                    <img src={this.props.track.album.images[1].url}></img>
                </div>
                
            </div>
        )
    }
    
}

export default TopTracksEntry;