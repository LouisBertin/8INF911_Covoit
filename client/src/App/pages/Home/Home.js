import React, { Component } from 'react';
import './Home.css';
import Map from "../../components/Map";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Handle = Slider.Handle;

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            slider_value: [true, 300]
        }
    }

    render() {
        return (
            <div className="Home">
                <h1> {this.props.loggedIn} </h1>
                <Slider
                    min={300}
                    max={1000}
                    step={100}
                    defaultValue={3}
                    handle={this.handle}
                    onAfterChange={this.updateSlider}
                />
                <Map
                    userGeolocate={true}
                    circle={this.state.slider_value}
                    loggedIn={this.props.loggedIn}
                    notify={this.notify}
                />
                <ToastContainer autoClose={3000}/>
            </div>
        )
    }

    handle = (props) => {
        const {value, dragging, index, ...restProps} = props;
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    };

    notify = (text) => {
        toast.success(
            text,
            {position: toast.POSITION.BOTTOM_RIGHT},
        );
    }

    updateSlider = (value) => {
        this.setState({slider_value: [true, value]})
    };
}

export default Home;
