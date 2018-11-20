import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

const overrideStyles = {
    padding: "5em",
    margin: "5em"
}

class Booking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    render() {
        const { firstName, lastName } = this.props.user;
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
                    maxWidth="md"
                    style={overrideStyles}
                    onBackdropClick={this.closeModal}
                >
                    <div style={{padding: "2em"}}>
                        hello {firstName}!
                    </div>
                </Dialog>
            </div>
        )
    }

    handleButtonClick = () => {
        this.openModal()
    };

    openModal = () => {
        this.setState({open: true})
    };

    closeModal = () => {
        this.setState({open: false})
    };

}

export default Booking