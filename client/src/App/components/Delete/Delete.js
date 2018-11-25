import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {getFromStorage} from "../../utils/storage";

const overrideStyles = {
    padding: "5em",
    margin: "5em"
}

class Delete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            token: null,
            lat: "",
            lng: ""
        }
    }


    componentDidMount() {
        console.log(this.state.lat + "++++++")
        if (this.props.loggedIn) {

            const obj = getFromStorage('the_main_app');
            if (obj && obj.token) {
                this.setState({token: obj.token})


            }
        }
    }

    render() {
        return (
            <div>
                <h6>ss {this.props.lat}</h6>
                <Button variant="contained" color="Primary" onClick={this.handleButtonClick}>Trajet</Button>
                <Button variant="contained" color="secondary" onClick={this.handleButtonClick}>Supprimer</Button>
                <Dialog
                    open={this.state.open}
                    maxWidth="md"
                    style={overrideStyles}
                    onBackdropClick={this.closeModal}
                >
                    <div>
                        <p>
                            Souhaitez-vous réellement supprimer ce marqueur ?
                        </p>
                        <Button variant="contained" color="secondary"
                                onClick={() => this.onDelete(this.props.id)}> Oui </Button>
                        <Button variant="contained" color="primary" onClick={this.closeModal}> Non </Button>
                    </div>
                </Dialog>
            </div>
        )
    }

    handleButtonClick = () => {
        this.openModal()
    };

    updateLngDel = (value) => {
        this.setState({lng: value})
    };
    updateLatDel = (value) => {
        this.setState({lat: value})

    };
    openModal = () => {
        this.setState({open: true})
    };

    closeModal = () => {
        this.setState({open: false})
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
    validateReservation = () => {
        const $this = this;

        fetch('/api/booking/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.state.token,
                driver_id: this.props.driver.id,
                marker_id: this.props.markerId,


            })
        }).then(res => res.json())
            .then(function (json) {
                if (json.success) {
                    $this.closeModal();
                    $this.props.notify('Covoit réservé!')
                }
            })
    };


}

export default Delete