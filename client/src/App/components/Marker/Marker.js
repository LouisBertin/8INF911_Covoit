import React, { Component } from 'react';

class Marker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: []
        }
    }

    componentDidMount() {
        fetch('/api/markers')
            .then(res => res.json())
            .then(json => {
                this.setState({markers: json})
            })
            .catch(function(err) {
                console.log('Fetch Error : ', err);
            });
    }

    render() {
        const { markers } = this.state;

        return(
            <div>
                <p>mes marqueurs</p>
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
                                <td><button onClick={() => this.onDelete(marker._id)}>Delete</button></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    onDelete = (id) => {
        // TODO : build route to delete marker
        console.log(id)
    }

}

export default Marker