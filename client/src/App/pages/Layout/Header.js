import React, { Component } from 'react';
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Logout from "../../components/Logout/Logout";

class Header extends Component {

    render () {
        return (
            <header>
                <nav>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap>
                                CoVoit
                            </Typography>

                            <Link to="/"><Button>Home</Button></Link>
                            <Link to="/contact"><Button>Contact</Button></Link>
                            <Button>Proposer un trajet</Button>
                                <ul>
                                    {
                                        (!this.props.loggedIn) ? (
                                            <div>
                                                <Link to="/signup"><Button color="primary"
                                                        variant="contained">Sign Up</Button></Link>
                                                <Link to="/signin"><Button color="primary" variant="outlined">Sign In</Button></Link>
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

                        </Toolbar>
                    </AppBar>
                </nav>

            </header>
        )
    }

}

export default Header