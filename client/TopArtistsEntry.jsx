import React from 'react';

class TopArtistsEntry extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.artist);
        return (
            <div key={this.props.artist.id} className="top-artist-entry">
                    <div>{this.props.artist.name}</div>
                    <img src={this.props.artist.images[1].url}></img>
            </div>
        )
    }
}

export default TopArtistsEntry;