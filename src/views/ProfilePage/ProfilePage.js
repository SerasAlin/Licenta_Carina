import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {useState, useEffect} from 'react';
// @material-ui/icons
import Home from "@material-ui/icons/Home";
import AccountBox from "@material-ui/icons/AccountBox";
import Pets from "@material-ui/icons/Pets"
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import ForAdoptionTable from "../../components/ForAdoptionTable/ForAdoptionTable.js"
import MyPetsTable from "../../components/MyPetsTable/MyPetsTable"

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    const [name, setName] = useState('dummyName');
    const [email, setEmail] = useState('dummyEmail');
    const [photo, setPhoto] = useState('');
    const [desc, setDesc] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("jwt-token")
            }
        };

        fetch('http://localhost:4000/user/me', requestOptions)
            .then(response => response.json())
            .then(data => handleResponse(data));
    }, []);

    function handleResponse(data) {
        setName(data.username);
        setEmail(data.email);
        setPhoto(data.photo[0]);
    }

    return (
        <div>
            <Header
                color="transparent"
                brand="Maynard Pet Shelter"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")}/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    {
                                        photo &&
                                        <div>
                                            <img src={`../img/${photo}`} alt="..." className={imageClasses}/>
                                        </div>
                                    }
                                    {
                                        photo &&
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>{name}</h3>
                                            <h6>PET LOVER</h6>
                                            <h6>{email}</h6>
                                            <h6>{city}</h6>
                                            <h6>{desc}</h6>
                                            <h6>{phone}</h6>
                                        </div>
                                    }
                                    {
                                        !photo &&
                                        <div className={classes.name} style={{marginTop : "10px"}}>
                                            <h3 className={classes.title}>{name}</h3>
                                            <h6>PET LOVER</h6>
                                            <h6>{email}</h6>
                                            <h6>{city}</h6>
                                            <h6>{desc}</h6>
                                            <h6>{phone}</h6>
                                        </div>
                                    }
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                        </div>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                                <NavPills
                                    alignCenter
                                    color="primary"
                                    tabs={[
                                        {
                                            tabButton: "For Adoption",
                                            tabIcon: Home,
                                            tabContent: (
                                                <GridContainer justify="center">
                                                    <ForAdoptionTable/>
                                                </GridContainer>
                                            )
                                        },
                                        {
                                            tabButton: "My Pets",
                                            tabIcon: Pets,
                                            tabContent: (
                                                <GridContainer justify="center">
                                                    <MyPetsTable/>
                                                </GridContainer>
                                            )
                                        },
                                        {
                                            tabButton: "Profile",
                                            tabIcon: AccountBox,
                                            tabContent: (
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <img
                                                            alt="..."
                                                            src={work4}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={studio3}
                                                            className={navImageClasses}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <img
                                                            alt="..."
                                                            src={work2}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={work1}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={studio1}
                                                            className={navImageClasses}
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
