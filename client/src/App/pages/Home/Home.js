import React, { Component } from 'react';
import './Home.css';
import Map from "../../components/Map";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import Route from '../../Images/Img-front.jpg'

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
                <div className="ImgAccueil">
                    <img src={Route} className="Route" alt="Route sur une belle vue"/>
                    <div className="Message1">
                        <h1> Faites vos courses pendant l'hiver en tout confort !</h1>
                        <h2>Trouvez un covoiturage à deux pas de chez vous !</h2>
                    </div>
                </div>
                <div className="Message2">
                    <h1> Pour commencer, selectionner un conducteur ci-dessous ! </h1>
                </div>
                <div className="MapHome" id="MapCenter">
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
                        notify={this.props.notify}
                    />
                </div>
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

    updateSlider = (value) => {
        this.setState({slider_value: [true, value]})
    };
}

export default Home;
