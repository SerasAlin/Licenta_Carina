import React, {useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {

    function registerUser() {
        console.log(name);
        console.log(email);
        console.log(password);

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: name, email: email, password: password})
        };

        fetch('http://localhost:4000/user/signup', requestOptions)
            .then(response => response.json())
            .then(data => handleResponse(data));

    }


    function handleResponse(data) {
        if (data.token) {
            props.history.push({
                pathname: '/login-page',
                state: {message: "Register completed!"}
            })
        }

        if (data.errors) {
            const newMessageObj = {errMsg: data.errors[0].msg};
            setErrMsg(newMessageObj);
        }

        if (data.msg) {
            const newMessageObj = {errMsg: data.msg};
            setErrMsg(newMessageObj);
        }

    }

    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    const [name, setName] = useState({name: ""});
    const [email, setEmail] = useState({email: ""});
    const [password, setPassword] = useState({password: ""});
    const [errMsg, setErrMsg] = useState({errMsg: ""});

    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const {...rest} = props;

    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Maynard Pet Shelter"
                rightLinks={<HeaderLinks/>}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "left"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Register</h4>
                                        <h6>It takes just a few seconds.</h6>
                                        {errMsg.errMsg !== "" &&
                                        <span style={{color: "red", backgroundColor: "white"}}>
                                            {errMsg.errMsg} !
                                        </span>
                                        }
                                    </CardHeader>
                                    <CardBody>
                                        <CustomInput
                                            labelText="First Name..."
                                            id="first"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor}/>
                                                    </InputAdornment>
                                                ),
                                                onChange: (e => setName(e.target.value))
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Email..."
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor}/>
                                                    </InputAdornment>
                                                ),
                                                onChange: (e => setEmail(e.target.value))
                                            }}

                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                onChange: (e => setPassword(e.target.value)),
                                                autoComplete: "off"
                                            }}

                                        />
                                        <a href="/login-page">
                                            Already have an account ? Login !
                                        </a>
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="primary" size="lg" onClick={registerUser}>
                                            Register
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont/>
            </div>
        </div>
    );
}
