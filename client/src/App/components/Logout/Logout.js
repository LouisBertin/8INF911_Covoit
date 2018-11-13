import React, { Component } from 'react';
import {getFromStorage} from "../../utils/storage";
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
            <button onClick={this.onLogOut}>Logout</button>
        );
    }

}

export default Logout;
