import React, { Component } from 'react';
import './prices.css';

class Prices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prices: null,
            currency: 'USD'
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => response.json())
            .then(prices => this.setState({ prices }));
    }

    handleChange = (event) => {
        this.setState({currency: event.target.value})
    }

    render() {

        let time, price = '';
        if (this.state.prices) {
            time = this.state.prices.time.updated
            price = this.state.prices.bpi[this.state.currency]
        }

        return (
            <div>
                <h2>Prices at {time}</h2>
                <li>
                    <p>{price.description} - {price.rate}</p>
                </li>
                <select onChange={this.handleChange}>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
        );
    }

}

export default Prices;
