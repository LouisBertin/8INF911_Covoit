import React, { Component } from 'react';
import './Home.css';
import Map from "../../components/Map";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

const Handle = Slider.Handle;

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            slider_value: [true, 300]
        }
    }

    updateSlider = (value) => {
        this.setState({slider_value: [true, value] })
    };

    handle = (props) => {
        const { value, dragging, index, ...restProps } = props;
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

    render() {
        return (
            <div className="Home">
                <Slider
                    min={300}
                    max={1000}
                    step={100}
                    defaultValue={3}
                    handle={this.handle}
                    onAfterChange={this.updateSlider}
                />
                <Map
                    getMarkers={true}
                    userGeolocate={true}
                    circle={this.state.slider_value}
                />
            </div>
        )
    }
}

export default Home;
