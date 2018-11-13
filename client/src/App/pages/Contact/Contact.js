import React, { Component } from 'react';
import './Contact.css';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Radio from '@material-ui/core/Radio';


class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <form class="lll">
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="firstname">First name</InputLabel>
                        <Input
                            type="text"
                            name="firstname"


                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lastname">Last name</InputLabel>
                        <Input
                            type="text"
                            namme="lastName"


                        />
                    </FormControl>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Genre</FormLabel>
                        <RadioGroup aria-label={"Gender"} row>
                            <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />

                        </RadioGroup>



                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="firstname">Email Address</InputLabel>
                        <Input
                            type="email"
                            name="email"


                        />
                    </FormControl>




                </form>
            </div>
        );
    }
}

export default Contact;
