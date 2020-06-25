import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {useState, useEffect} from "react";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import Check from "@material-ui/core/SvgIcon/SvgIcon";
import TableCell from "../../components/ForAdoptionTable/ForAdoptionTable";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    const [loggedInUser, setLoggedInUser] = useState("");

    const [successMessage, setSuccessMessage] = useState(false);

    const [name, setName] = useState("dummyName");
    const [type, setType] = useState("dummyType");
    const [photo, setPhoto] = useState("");
    const [age, setAge] = useState("");
    const [tag, setTag] = useState("");
    const [desc, setDesc] = useState("");
    const [sex, setSex] = useState("");
    const [breed, setBreed] = useState("");
    const [masterId, setMasterId] = useState("");

    const [userName, setUserName] = useState("dummyName");
    const [userEmail, setUserEmail] = useState("dummyEmail");
    const [userPhoto, setUserPhoto] = useState("");
    const [userDesc, setUserDesc] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userCity, setUserCity] = useState("");

    useEffect(() => {
        const getCurrentLoggedInUserOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("jwt-token"),
            },
        };

        fetch("http://localhost:4000/user/me", getCurrentLoggedInUserOptions)
            .then((response) => response.json())
            .then((data) => {
                setLoggedInUser(data._id);
            });

        const getPetRequestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                tag: props.location.state.tag,
            },
        };

        fetch("http://localhost:4000/animal/pet-page", getPetRequestOptions)
            .then((response) => response.json())
            .then((data) => {
                setPetData(data);

                const getMasterRequestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        master_id: data.master_id,
                    },
                };

                fetch("http://localhost:4000/user/user-animal", getMasterRequestOptions)
                    .then((response) => response.json())
                    .then((data) => setUserData(data));
            });
    }, []);

    function setPetData(data) {
        console.log(data);
        setName(data.name);
        setType(data.type);
        setPhoto(data.photo);
        setAge(data.age);
        setTag(data.tag);
        setDesc(data.story);
        setBreed(data.breed);
        setSex(data.sex);

        if (data.photo === "") {
            setPhoto("uploads/img/faces/dummyPetAvatar.png");
        }
    }

    function setUserData(data) {
        console.log(data);
        setUserName(data.username);
        setUserEmail(data.email);
        setUserPhoto(data.photo);
        setUserDesc(data.desc);
        setUserPhone(data.phone);
        setUserCity(data.city);

        if (data.photo === "") {
            setUserPhoto("uploads/img/faces/dummyAvatar.png");
        }
    }

    function adoptPet(tag) {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                tag: tag,
            },
            body: JSON.stringify({
                status: "Adopted",
                master_id: loggedInUser,
            }),
        };

        console.log(requestOptions);

        fetch("http://localhost:4000/animal/update-animal", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 5000);
            });
    }

    function SuccessMessage() {
        return (
            <SnackbarContent
                message={<span>Success! Go to your profile to see your pet</span>}
                close
                color="success"
                icon={Check}
            />
        );
    }

    var imageStyle = {
        width: "100px",
        height: "100px",
    };

    return (
        <div>
            <Header
                color="transparent"
                brand="Pick a Paw"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white",
                }}
                {...rest}
            />
            <Parallax small filter image={require("assets/img/profile-bg-pet.jpg")}/>
            <div
                className={classNames(classes.main, classes.mainRaised)}
                style={{marginTop: "100px"}}
            >
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={6} sm={3} md={3}>
                                <div className={classes.profile}>
                                    <div>
                                        <img
                                            style={imageStyle}
                                            src={`http://localhost:4000/${photo}`}
                                            alt="..."
                                            className={imageClasses}
                                        />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>{name}</h3>
                                        <h6>{desc}</h6>
                                        <h6>Type : {type}</h6>
                                        <h6>Breed : {breed}</h6>
                                        <h6>Sex : {sex}</h6>
                                        <h6>Age: {age}</h6>
                                        <h6>Tag: {tag}</h6>
                                    </div>
                                </div>
                            </GridItem>
                            <GridItem xs={6} sm={3} md={3}>
                                <br/>

                                <div>
                                    <h4>Given to adoption by</h4>
                                </div>
                                <br/>
                                <br/>
                                <Button
                                    onClick={() => adoptPet(tag)}
                                    style={{marginLeft: "60px"}}
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    className={classes.margin}
                                >
                                    Adopt!
                                </Button>
                                {successMessage && <SuccessMessage/>}
                            </GridItem>
                            <GridItem xs={6} sm={3} md={3}>
                                <div className={classes.profile}>
                                    <div>
                                        <img
                                            style={imageStyle}
                                            src={`http://localhost:4000/${userPhoto}`}
                                            alt="..."
                                            className={imageClasses}
                                        />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>{userName}</h3>
                                        <h6>{userDesc}</h6>
                                        <h6>{userEmail}</h6>
                                        <h6>{userCity}</h6>
                                        <h6>{userPhone}</h6>
                                    </div>
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
