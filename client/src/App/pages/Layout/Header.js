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
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                        <Logout/>
                    </ul>
                </nav>
            </header>
        )
    }

}

export default Header