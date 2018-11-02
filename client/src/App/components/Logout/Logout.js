import React, { Component } from 'react';
import {getFromStorage} from "../../utils/storage";

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
                        // TODO: Do it dynamically
                        window.location.replace("http://localhost:3000/");
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
