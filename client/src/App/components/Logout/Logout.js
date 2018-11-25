import React, { Component } from 'react';
import {getFromStorage} from "../../utils/storage";
import Button from "@material-ui/core/Button";
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
            <Button color="primary" variant="contained" onClick={this.onLogOut}>Logout</Button>
        );
    }

}

export default Logout;
