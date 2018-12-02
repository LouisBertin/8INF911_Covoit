import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Logout from "../../components/Logout/Logout";
import './Header.css'
import Logo from './Logo-WEB.png';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer';

const config = require('../../utils/storage');

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openMenu: false,
            conteneurUser: '',
        }
    }

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    closeDrawer = () => {
        this.setState({
            open: false,
        });
    };


    componentWillMount() {
        const obj = config.getFromStorage('the_main_app');

        if (obj && obj.token) {
            config.getUserFromToken(obj.token).then((user) => {
                console.log(user)
                this.setState({conteneurUser: user})
            })
        }
    }

    render() {
        return (
            <AppBar position="static" color="default" className="Header">
                <Toolbar>
                    <Hidden smDown>
                        <div>
                            <img src={Logo} className="LogoSite" alt="Logo"/>
                            <Link to="/"><Button>Home</Button></Link>
                            {/*
                            <Link to="/contact"><Button>Contact</Button></Link>
    */}
                            <a href="#MapCenter"><Button> mon épicerie</Button></a>
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
                                        <Link to="/user/profile">
                                            <Button>
                                                Mes trajets
                                            </Button>
                                        </Link>

                                        <Link to="/user/mybookings"><Button>Mes Réservations</Button></Link>
                                        <Logout/>
                                    </div>

                            }
                        </ul>
                    </Hidden>
                    <div>
                        <Hidden mdUp>
                            <img src={Logo} className="LogoSite" alt="Logo"/>
                            <Button onClick={this.handleClick}>
                                <i
                                    className="material-icons">
                                    reorder
                                </i>
                            </Button>
                            <Drawer anchor={"right"} variant="temporary" open={this.state.open}
                                    onClose={this.closeDrawer}>
                                <List color="primary" variant="outlined" className={"Collapse"}>
                                    <ListItem>
                                        <Link to="/"><Button onClick={this.closeDrawer}>Home</Button></Link>
                                    </ListItem>

                                    {
                                        (!this.props.loggedIn) ? (
                                                <Fragment>
                                                    <ListItem>
                                                        <Link to="/signup">
                                                            <Button onClick={this.closeDrawer} color="primary"
                                                                    variant="contained"
                                                                    className="margin-button">S'inscrire</Button>
                                                        </Link>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Link to="/signin">
                                                            <Button onClick={this.closeDrawer} color="primary"
                                                                    variant="outlined">Se connecter</Button>
                                                        </Link>
                                                    </ListItem>
                                                </Fragment>

                                            ) :

                                            /* Authenticated routes */
                                            <div>
                                                <ListItem><Link to="/user/profile"><Button onClick={this.closeDrawer}>Mes
                                                    trajets</Button></Link></ListItem>
                                                <ListItem><Link to="/user/mybookings"><Button
                                                    onClick={this.closeDrawer}>Mes
                                                    Réservations</Button></Link></ListItem>
                                                <ListItem><Logout/></ListItem></div>
                                    }

                                </List>
                            </Drawer>
                        </Hidden>

                    </div>


                </Toolbar>
            </AppBar>
        )
    }

}

export default Header