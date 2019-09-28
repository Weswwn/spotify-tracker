import React from 'react';
import TopSongs from './TopSongs.jsx';
import axios from 'axios';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.requestAuthorization = this.requestAuthorization.bind(this);
    }

    requestAuthorization() {
        axios.get('/authorize')
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="container">
                <a href="/authorize">
                    <button >Authorize Spotify Connection</button>
                </a>
                {/* <TopSongs /> */}
            </div>
        )
    }
    
}

export default App;