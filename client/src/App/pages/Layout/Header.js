import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Logout from "../../components/Logout/Logout";

class Header extends Component {

    render () {
        return (
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    <ul>
                        {
                            (!this.props.loggedIn) ? (
                                <div>
                                    <li><Link to="/signup">Sign Up</Link></li>
                                    <li><Link to="/signin">Sign In</Link></li>
                                </div>
                            ) :

                            /* Authenticated routes */
                            <div>
                                <Logout/>
                                <li><Link to="/user/profile">Profile</Link></li>
                                <li><Link to="/user/markers/show">Markers</Link></li>
                            </div>

                        }
                    </ul>
                </nav>
            </header>
        )
    }

}

export default Header