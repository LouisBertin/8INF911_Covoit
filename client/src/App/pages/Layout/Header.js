import React, { Component } from 'react';
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Logout from "../../components/Logout/Logout";
import Logo from './logoWebSemantique2.png'
import './Header.css'

class Header extends Component {

    render () {
        return (
            <AppBar position="static" color="default" className="Header">
                <Toolbar>
                    <img src={Logo} className="image"/>

                    <Link to="/"><Button>Home</Button></Link>
                    <Link to="/contact"><Button>Contact</Button></Link>
                    <Button>Proposer un trajet</Button>
                            {
                                (!this.props.loggedIn) ? (
                                    <div>
                                        <Link to="/signup">
                                            <Button color="primary" variant="contained" className="margin-button">Sign Up</Button>
                                        </Link>
                                        <Link to="/signin">
                                            <Button color="primary" variant="outlined">Sign In</Button>
                                        </Link>
                                    </div>
                                ) :

                    /* Authenticated routes */
                    <div>

                        <Link to="/user/profile"><Button>Profile </Button></Link>
                        <Link to="/user/markers/show"><Button>Markers</Button></Link>
                        <Logout/>
                    </div>

                            }


                </Toolbar>
            </AppBar>
        )
    }

}

export default Header