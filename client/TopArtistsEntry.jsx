import React from 'react';

class TopArtistsEntry extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.artist);
        return (
            <div className="top-artist-entry">
                {this.props.artist.name}
            </div>
        )
    }
    
}

export default TopArtistsEntry;