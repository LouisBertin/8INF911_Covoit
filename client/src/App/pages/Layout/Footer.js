import React, { Component, Fragment } from 'react';
import Typography from "@material-ui/core/Typography";
import Img from 'react-image';
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import './Footer.css'

class Footer extends Component {

    render () {
        return (
            <footer className="footer-component">
                <div>
                    <Grid container spacing={0} justify="center">
                        <Grid item xs>
                            <Typography variant="h5" color="textPrimary" gutterBottom>
                                CoVoit
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                L'équipe
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Contactez-nous
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Presse
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                Trajet
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Foire aux questions
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Assurance et sécurité
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Accessibilité
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                Misc.
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Offres d'emplois
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Conditions génnérales
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Offres d'emplois
                            </Typography>
                        </Grid>
                        <Grid item>
                            <List>
                                <ListItem>
                                    <Img className="icone" src="https://image.flaticon.com/icons/png/128/220/220200.png"  />
                                </ListItem>
                                <ListItem>
                                    <Img className="icone" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAVFBMVEX///9QzNP7/v7n+Plr09m26u1k0tfN8PJ21932/P2c4uZbz9W+7O+n5emJ3eG66+5/2t7w+/vq+frV8/TH7/Hb9fZ019uT4OSb4uWv5+ul5eiD2t/0otZlAAADlklEQVR4nO2aabOqMAyGpewUkB2B//8/L6AeFbskJT1n5k6fb87UJrTpm3S5XBwOh8PhcDgcDsf/Rd1lVcQ9jwfl1P+6dZZX3jvR3IjbWTIfRt4X47cLfpVasd8H3+ZX+PTZLJ29RNOTb2S/EJrfqOpXq2Ze4yNX98SCAm+elVL7ayg8PskP9xAJNCGQe16Itl8p7K/TEIbFreKPX62ms2Ftc0U6oPr+I7Omr35vhfNAPv/fVLrO5ns7zCy0CPuJdgk+FxM8Epl4/QkJHisilfqR/rQdoXo1Ib7/br+eSmlv/as1ULBSLjd4oNx63BYjl2tN9z5eIEkK4fbjMLsvxg7YHY8BDiAi4IlqJR4mtNAGgo+3Lw+A4wisJOKEKvUYwKL8qPzYnCvmawMjgvdPUse2QFTKWvUHbAjolCgV/IcrhJkR25d80SAt72pq+5eb+J+lRBMalH2Itkkzyyh0AbUKS5C6CyrL5/8FE4GaAoh59cIerscxRAUhzAF1cuFl9+mDfMBMHdDXN1URv5xY6B1IIR8VLNmUd3EbI5SQAx34SMmURFAHLqMdBwKwA6lBjgegLYg3+j39+vAyC4GyDniS82KLcEylDSYDObAGa7YqXmzBAdBe426YD4mFSYBUmCYlHhhQkY0tMDDAdjqDNfu6g5EHszUHRpgDvb4nQ6BbfjsquAI9NoTv9XCAcyHDlBgIQEK887U5ogFx5pJYcQBx/NjYyIXwYuBiJxPpTuc+udI7gDy7J/cANQMbMXEc4M+fG/XxLxbdQYuInFCRFgP7qyZeyfICqBgS0c8ksYAOwTUlVeNcFNlCE4uaOxIRpLWh7o5ECGVCMBgA0h2qQQRs0FWnhkuArDg004CVjMa+4m5AA6OJw0lvSUZNIYTA7YiY5rwH5hNwH4PTS8FIAt5gJyMRuB1T0Z4JxYHkqUJnPA+R8qoDgV8Y+cApH5GwvsNcUe/2dff0SNCqYFwFicFqAujSE0GLLI2Ix59hD26icwJ4pEVfDlKtv50ecyexA356AIDlaCXkZ/X/Rd2N+LI8MS9A/LeRa9pwNEnGfDox/HHEgyGpkiEw3o4sJpvQF/XJu5rgvPjEJ2qgIKcIfjYZDn9wpVp7qYkLleadBQ52xaV/ntEK70Z/gw4DLzs7T0RZm+kDko+dnfehD+ouG6QjwZdferfrx2FWJj/axKMgKW9TTD/teliaWnoR7HA4HA6H40/5B5I8K+EcBzaVAAAAAElFTkSuQmCC" />
                                </ListItem>
                                <ListItem>
                                    <Img className="icone" src="https://fr.officetooltips.com/images/tips/382_2016/linkedin2.png" />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </div>
            </footer>
        )
    }

}

export default Footer