import React, { Component, Fragment } from 'react';
import './Footer.css'
import Logo from './Logo-WEB.png';


class Footer extends Component {

    render () {
        return (
            <footer className="footer-component">
                <div>
                        <img src={Logo} className="LogoSite" alt = "Logo"/>
                        <span className="Copyright">© Copyright 2018 - Covoit</span>
                        <span className="CGU">CGU</span>
                </div>
            </footer>
        )
    }

}

export default Footer