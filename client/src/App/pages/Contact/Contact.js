import React, { Component } from 'react';
import './Contact.css';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from '@material-ui/core/Radio';

class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <form className="lll">
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="firstname">Prenom</InputLabel>
                        <Input
                            type="text"
                            name="firstname"


                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lastname">Nom</InputLabel>
                        <Input
                            type="text"
                            namme="lastName"


                        />
                    </FormControl>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Genre</FormLabel>
                        <RadioGroup aria-label={"Gender"} row>
                            <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                            <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                            <FormControlLabel value="other" control={<Radio color="primary"/>} label="Other" />

                        </RadioGroup>



                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="firstname">Adresse e-mail</InputLabel>
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
