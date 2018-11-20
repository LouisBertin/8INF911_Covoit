import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {getFromStorage} from "../../utils/storage";

const overrideStyles = {
    padding: "5em",
    margin: "5em"
}

class Booking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            token: null
        }
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            const obj = getFromStorage('the_main_app');

            if (obj && obj.token) {
                this.setState({token: obj.token})
            }
        }
    }

    render() {
        const { firstName, lastName } = this.props.driver;
        const { loggedIn } = this.props;

        return (
            <div>
                <p>{firstName} {lastName}</p>

                {
                    (loggedIn) ? (
                        <Button color="primary" variant="contained" onClick={this.handleButtonClick}>
                            Réserver
                        </Button>
                    ) : <p style={{color: "red"}}><b>Veuillez vous connecter pour réserver</b></p>
                }

                <Dialog
                    open={this.state.open}
                    fullWidth={true}
                    style={overrideStyles}
                    onBackdropClick={this.closeModal}
                >
                    <div style={{padding: "2em", textAlign: "center"}}>
                        <h3>Hello {firstName} {lastName}</h3>
                        <p>Êtes-vous sûr de vouloir réserver ?</p>
                        <Button color="primary" variant="contained" onClick={this.validateBooking}>
                            Valider
                        </Button>
                    </div>
                </Dialog>
            </div>
        )
    }

    handleButtonClick = () => {
        this.openModal()
    };

    validateBooking = () => {
        const $this = this;

        fetch('/api/booking/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.state.token,
                driver_id: this.props.driver.id,
                marker_id: this.props.markerId
            })
        }).then(res => res.json())
            .then(function (json) {
                if (json.success) {
                    $this.closeModal()
                }
            })
    };

    openModal = () => {
        this.setState({open: true})
    };

    closeModal = () => {
        this.setState({open: false})
    };

}

export default Booking