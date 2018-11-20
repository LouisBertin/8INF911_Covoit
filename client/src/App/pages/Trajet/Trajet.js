import React, {Component} from 'react';
import {getFromStorage} from "../../utils/storage";
import Map from "../../components/Map";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";


class Trajet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: '',
            lat: '',
            errorMsg: '',
            userToken: '',
            startPosition: true,
            msgButton: 'Départ autre part'
        }
        this.chooseDeparture = this.chooseDeparture.bind(this);
    }

    componentWillMount() {
        const obj = getFromStorage('the_main_app');
        if (obj.token) {
            this.setState({userToken: obj.token})
        }
    };

    render() {
        const {userToken, errorMsg} = this.state;

        return (
            <div>

                <h3>Proposer un trajet</h3>
                {
                    (errorMsg) ? (
                        <p>{errorMsg}</p>
                    ) : null
                }
                <Button color="primary" variant="contained">{this.state.msgButton}</Button>
                {
                    this.state.startPosition === true && (<Map
                        userGeolocate={true}
                        searchBar={true}
                        updateLng={this.updateLng}
                        updateLat={this.updateLat}
                    />)
                }
                <button onClick={this.onAddMarker}>Send</button>

            </div>
        );
    }

    // updateStates
    updateLng = (value) => {
        this.setState({lng: value})
    };
    updateLat = (value) => {
        this.setState({lat: value})
    };
    handleOptionChange = (changeEvent) => {
        this.setState({
            startPosition: changeEvent.target.value
        })
    };


    chooseDeparture = () => {
        if (this.state.startPosition) {
            this.setState({msgButton: "Départ sur ma position"})
            this.setState({startPosition: false})

        }


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

export default Trajet;