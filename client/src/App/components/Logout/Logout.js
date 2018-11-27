import React, { Component } from 'react';
import {getFromStorage} from "../../utils/storage";
import Button from "@material-ui/core/es/Button/Button";
const config = require('../../utils/config')

class Logout extends Component {

    // logout
    onLogOut = (event) => {
        const obj = getFromStorage('the_main_app');

        if (obj && obj.token) {
            const { token } = obj;

            fetch('/api/account/logout?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        window.location.replace(config.SITE_URL);
                    }
                })
        }
    };

    render() {
        return (
            <Button variant="contained" color="secondary" onClick={this.onLogOut}>
                Déconnexion
            </Button>
        );
    }

}

export default Logout;
