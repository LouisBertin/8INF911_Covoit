import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Logout from "../../components/Logout/Logout";
import './Header.css'
import Logo from './Logo-WEB.png';

class Header extends Component {

    render() {
        return (
            <AppBar position="static" color="default" className="Header">
                <Toolbar>
                    <div>
                        <img src={Logo} className="LogoSite" alt = "Logo"/>
                        <Link to="/"><Button>Home</Button></Link>
                        {/*
                    <Link to="/contact"><Button>Contact</Button></Link>
*/}
                    <a href="#MapCenter"><Button>Faire mon épicerie</Button></a>
                    </div>
                    <ul className="auth-routes">
                        {
                            (!this.props.loggedIn) ? (
                                    <div>
                                        <Link to="/signup">
                                            <Button color="primary" variant="contained"
                                                    className="margin-button">S'inscrire</Button>
                                        </Link>
                                        <Link to="/signin">
                                            <Button color="primary" variant="outlined">Se connecter</Button>
                                        </Link>
                                    </div>
                                ) :
                                /* Authenticated routes */
                                <div>
                                    <Link to="/user/profile"><Button>Mes trajets</Button></Link>
                                    <Link to="/user/mybookings"><Button>Mes Réservations</Button></Link>
                                    <Logout/>
                                </div>

                        }
                    </ul>

                </Toolbar>
            </AppBar>
        )
    }

}

export default Header