import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/DescriptionSection.js";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import Check from "@material-ui/core/SvgIcon/SvgIcon";
import auth from "../../auth";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {

    function RedirectMessage() {
        return (
            <SnackbarContent
                message="Login and save a pet!"
                close
                color="primary"
                icon={Check}
            />
        );
    }

    const classes = useStyles();
    const {...rest} = props;
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if (!auth.isAuthenticated()) {
            setUpdated(true);
            setTimeout(() => {
                setUpdated(false);
            }, 3000);
        }

    }, []);

    return (
        <div>
            <Header
                color="transparent"
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
            <Parallax filter image={require("assets/img/landing-bg.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Their Story Starts With You.</h1>
                            <h4>
                                Every landing page needs a small description after the big bold
                                title, that{"'"}s why we added this text here. Add here all the
                                information that can make you or your product create the first
                                impression.
                            </h4>
                            <div>
                                {updated && <RedirectMessage/>}
                            </div>
                            <br/>
                            {
                                !localStorage.getItem("jwt-token") &&
                                <Button
                                    color="danger"
                                    size="lg"
                                    href="/register-page"
                                    rel="noopener noreferrer"
                                >
                                    Register Now !
                                </Button>
                            }
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <ProductSection/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
