import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

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

        this.setState({open: false})
    }


}

export default Delete