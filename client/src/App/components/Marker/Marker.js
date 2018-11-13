import React, { Component } from 'react';
import {getFromStorage} from "../../utils/storage";

class Marker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            errorMsg: ''
        }
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');

        if (obj && obj.token) {
            const user_token = obj.token;

            this.getMarkers(user_token)
        }
    }

    render() {
        const { markers, errorMsg } = this.state;

        return(
            <div>
                <p>mes marqueurs</p>
                {
                    (errorMsg) ? <p>{errorMsg}</p> : null
                }
                <table border="1px">
                    <thead>
                        <tr>
                            <td>Lat</td>
                            <td>Lng</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        markers.map((marker, i) =>
                            <tr key={marker._id}>
                                <td>{marker.lat}</td>
                                <td>{marker.lng}</td>
                                <td><button onClick={() => this.onDelete(marker._id)} >Delete</button></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    getMarkers = (user_token) => {
        const url = '/api/markers/token?token=' + user_token;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({markers: json})
            })
            .catch(function(err) {
                console.log('Fetch Error : ', err);
            });
    };

    onDelete = (id) => {
        fetch('/api/markers/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            })
        }).then(res => res.json())
            .then(json => {
                if (!json.success) {
                    this.setState({errorMsg: json.message})
                } else {
                    this.setState({errorMsg: json.message})
                    this.setState(this.componentDidMount)
                }
            })
    }

}

export default Marker