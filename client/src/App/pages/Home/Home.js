import React, { Component } from 'react';
import './Home.css';
import Map from "../../components/Map";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import Route from '../../images/Img-front.jpg'
import Button from "@material-ui/core/Button";


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
                    <div className="overlay"></div>
                    <img src={Route} className="Route" alt="Route sur une belle vue"/>
                    <div className="Message1">
                        <h1> Besoin de faire vos courses en toute tranquilité ?</h1>
                        <a href="#MapCenter"> <Button color={"primary"} variant={"contained"} className="Bouton"> C'est
                            parti ! </Button></a>
                        <h2>Trouvez un covoiturage à deux pas de chez vous !</h2>
                    </div>
                </div>
                <div className={"MapnMess"}>
                    <div className="Message2">
                        <h1> Pour commencer, sélectionner un conducteur ci-dessous ! </h1>
                        <p>Utilisez le curseur pour augmenter votre périmètre de recherche</p>
                    </div>
                    <div className="MapHome" id="MapCenter">
                        <div className="sliderContainer">
                            <Slider
                                min={300}
                                max={1000}
                                step={100}
                                defaultValue={3}
                                handle={this.handle}
                                onAfterChange={this.updateSlider}
                            />
                        </div>
                        <Map
                            userGeolocate={true}
                            circle={this.state.slider_value}
                            loggedIn={this.props.loggedIn}
                            notify={this.props.notify}
                        />
                    </div>
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
