import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from "assets/jss/material-kit-react/views/landingPage.js";

import Paper from "@material-ui/core/Paper/Paper";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function AdoptPage(props) {

    const classes = useStyles();
    const {...rest} = props;

    const [pets, setPets] = useState([]);

    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    var imageStyle = {
        width: "100px",
        height: "100px",
    };

    useEffect(() => {
        const getMemberIdOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("jwt-token")
            }
        };

        fetch('http://localhost:4000/user/me', getMemberIdOptions)
            .then(response => response.json())
            .then(data => {
                let memberProfileId = data._id;
                console.log(memberProfileId);
                fetch('http://localhost:4000/animal/all-animals')
                    .then(response => response.json())
                    .then(data => {
                        setPets(pets => pets.concat(data));
                        console.log(pets);
                    })
            });

    }, []);

    function openPetProfile(tag) {
        props.history.push({
            pathname: '/pet-profile-page',
            state: {tag: tag}
        })
    }

    return (
        <div>
            <Header
                routes={dashboardRoutes}
                brand="Maynard Pet Shelter"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax filter image={require("assets/img/pets.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Adopt page title</h1>
                            <h4>
                                Adopt page intro speech
                            </h4>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Adopt page title</h1>
                            <h4>
                                Adopt page intro speech
                            </h4>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <TableContainer component={Paper}>
                        <div className={classes.profile}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Photo</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Type</TableCell>
                                        <TableCell align="center">Age</TableCell>
                                        <TableCell align="center">Tag</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pets.map((pet) => (
                                        pet.status === "For adoption" &&
                                        <TableRow key={pet.tag}>
                                            <TableCell align="center" component="th" scope="row">
                                                {
                                                    pet.photo &&
                                                    <img style={imageStyle} src={`../img/${pet.photo}`} alt="..."
                                                         className={imageClasses}/>
                                                }
                                                {
                                                    !pet.photo &&
                                                    <img style={imageStyle} src={`../img/faces/dummyPetAvatar.png`} alt="..."
                                                         className={imageClasses}/>
                                                }
                                            </TableCell>
                                            <TableCell align="center">{pet.name}</TableCell>
                                            <TableCell align="center">{pet.type}</TableCell>
                                            <TableCell align="center">{pet.age}</TableCell>
                                            <TableCell align="center">{pet.tag}</TableCell>
                                            <TableCell align="center">{pet.status}</TableCell>
                                            <TableCell align="center">
                                                <Button color="primary" onClick={() => openPetProfile(pet.tag)}>
                                                    View
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TableContainer>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
