import React from 'react';

class CurrentPlayback extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        // console.log(this.props.playbackState);
        return (
            <div className="current-playback">
                {Object.keys(this.props.playbackState).length !== 0 ?
                <span>
                    <img src={this.props.playbackState.item.album.images[1].url}></img>
                    <div>
                        <div>Song Name: {this.props.playbackState.item.name}</div>
                        <div>Album Name: {this.props.playbackState.item.album.name}</div>
                        <div>Song Release Date: {this.props.playbackState.item.album.release_date}</div> 
                        <div>Device Name: {this.props.playbackState.device.name}</div> 
                        <div>Device Type: {this.props.playbackState.device.type}</div>
                        <div>Current Volume Percentage: {this.props.playbackState.device.volume_percent}</div>
                    </div>
                    
                </span>
                    : <div>User is not currently listening to music! </div>}
            </div>
        )
    }
    
}

export default CurrentPlayback;