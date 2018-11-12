import React, { Component } from 'react';
import {getFromStorage} from "../../utils/storage";

class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lng: '',
            lat: '',
            errorMsg: '',
            userToken: ''
        }
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj.token) {
            this.setState({userToken: obj.token})
        }
    };

    render () {
        const { errorMsg } = this.state;

        return (
            <div>
                <h3>Profile page</h3>

                {
                    (errorMsg) ? (
                        <p>{errorMsg}</p>
                    ) : null
                }

                <input type="text" name="lng" placeholder="lng" onChange={this.onChangeLng}/><br/>
                <input type="text" name="lat" placeholder="lat" onChange={this.onChangeLat}/><br/>
                <button onClick={this.onAddMarker}>Send</button>

            </div>
        )
    }

    // onChange
    onChangeLng = (event) => {
        this.setState({lng: event.target.value})
    };
    onChangeLat = (event) => {
        this.setState({lat: event.target.value})
    };

    // onClick
    onAddMarker = () => {
        const {
            lat,
            lng,
            userToken
        } = this.state;

        fetch('/api/markers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: lat,
                lng: lng,
                token: userToken
            })
        }).then(res => res.json())
            .then(json => {
                if (!json.success) {
                    this.setState({errorMsg: json.message})
                } else {
                    this.setState({errorMsg: 'Congratulations'})
                }
            })
    }

}

export default Index