import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import './Delete.css'
import Format from "date-fns/format";
const overrideStyles = {
    padding: "5em",
    margin: "5em"
}

class Delete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    render() {
        return (
            <div>
                {console.log(this.props.marker)}
                <p>Trajet
                    du {Format(this.props.marker.departureDate, 'yyyy-MM-dd')} à {Format(this.props.marker.departureDate, 'HH:mm')}</p>
                <p>Départ : {this.props.marker.placeStart.text} - Arrivé : {this.props.marker.placeEnd.text}</p>
                <Button variant="contained" color="secondary" onClick={this.handleButtonClick}>Supprimer</Button>
                <Dialog
                    open={this.state.open}
                    maxWidth="md"
                    style={overrideStyles}
                    onBackdropClick={this.closeModal}
                >
                    <div className="DeleteText">
                        <p>
                            Souhaitez-vous réellement supprimer ce trajet ?
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
                    this.props.notify('Votre trajet a été supprimé!');
                    this.props.userMarker(this.props.token)
                }
            });

        this.setState({open: false})
    }


}

export default Delete