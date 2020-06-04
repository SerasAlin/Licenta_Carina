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
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgFluid,
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    const [name, setName] = useState('dummyName');
    const [type, setType] = useState('dummyType');
    const [photo, setPhoto] = useState('');
    const [age, setAge] = useState('');
    const [tag, setTag] = useState('');
    const [desc, setDesc] = useState('');


    const [userName, setUserName] = useState('dummyName');
    const [userEmail, setUserEmail] = useState('dummyEmail');
    const [userPhoto, setUserPhoto] = useState('');
    const [userDesc, setUserDesc] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userCity, setUserCity] = useState('');

    useEffect(() => {
        const getPetRequestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'tag': props.location.state.tag
            }
        };

        const getUserRequestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("jwt-token")
            }
        };

        fetch('http://localhost:4000/animal/pet-page', getPetRequestOptions)
            .then(response => response.json())
            .then(data => setPetData(data));

        fetch('http://localhost:4000/user/me', getUserRequestOptions)
            .then(response => response.json())
            .then(data => setUserData(data));
    }, []);

    function setPetData(data) {
        console.log(data);
        setName(data.name);
        setType(data.type);
        setPhoto(data.photo);
        setAge(data.age);
        setTag(data.tag);
        setDesc(data.story);
    }

    function setUserData(data) {
        console.log(data);
        setUserName(data.username);
        setUserEmail(data.email);
        setUserPhoto(data.photo);
        setUserDesc(data.desc);
        setUserPhone(data.phone);
        setUserCity(data.city);
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
            <Parallax small filter image={require("assets/img/profile-bg-pet.jpg")}/>
            <div className={classNames(classes.main, classes.mainRaised)} style={{marginTop: "100px"}}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={6} sm={3} md={3}>
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
                                            <h6>{desc}</h6>
                                            <h6>Type : {type}</h6>
                                            <h6>Age: {age}</h6>
                                            <h6>Tag: {tag}</h6>
                                        </div>
                                    }
                                    {
                                        !photo &&
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>{name}</h3>
                                            <h6>{desc}</h6>
                                            <h6>Type: {type}</h6>
                                            <h6>Age: {age}</h6>
                                            <h6>Tag: {tag}</h6>
                                        </div>
                                    }
                                </div>
                            </GridItem>
                            <GridItem xs={6} sm={3} md={3}>
                                <div>
                                    <h3>Given to adoption by</h3>
                                </div>
                                <Button style={{marginLeft: "70px"}} variant="contained" size="large" color="secondary" className={classes.margin}>
                                    Adopt!
                                </Button>
                            </GridItem>
                            <GridItem xs={6} sm={3} md={3}>
                                <div className={classes.profile}>
                                    {
                                        photo &&
                                        <div>
                                            <img src={`../img/${userPhoto}`} alt="..." className={imageClasses}/>
                                        </div>
                                    }
                                    {
                                        photo &&
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>{userName}</h3>
                                            <h6>{userDesc}</h6>
                                            <h6>{userEmail}</h6>
                                            <h6>{userCity}</h6>
                                            <h6>{userPhone}</h6>
                                        </div>
                                    }
                                    {
                                        !photo &&
                                        <div className={classes.name} style={{marginTop : "10px"}}>
                                            <h3 className={classes.title}>{userName}</h3>
                                            <h6>{userDesc}</h6>
                                            <h6>{userEmail}</h6>
                                            <h6>{userCity}</h6>
                                            <h6>{userPhone}</h6>
                                        </div>
                                    }
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
