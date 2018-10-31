import React, { Component } from 'react';

class Cats extends Component {

    constructor() {
        super();
        this.state = {
            cats: []
        }
    }

    componentDidMount() {
        fetch('/cats')
            .then(res => res.json())
            .then(cats => this.setState({cats}))
    }

    render() {

        console.log(this.state.cats)

        return (
            <div className="cats">
                <h1>Miaouuu!</h1>
                <ul>
                    {this.state.cats.map(cats =>
                        <li key={cats._id} >{cats.name}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Cats;
