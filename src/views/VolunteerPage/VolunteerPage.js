import React, {createRef} from "react";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import VolunteerTable from "../../components/VolunteerTable/VolunteerTable";
import {makeStyles} from "@material-ui/core/styles";
import LostTable from "../../components/LostTable/LostTable";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import Parallax from "../../components/Parallax/Parallax";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);


export default function VolunteerPage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const volunteer = createRef();
    const lost = createRef();

    function handleOnClick(event) {
        //.current is verification that your element has rendered
        if (volunteer.current) {
            volunteer.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        } else if (lost.current) {
            lost.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }

    return (
        <div
            className="main"
            style={{
                marginTop: "60px",
                padding: "40px",
            }}
        >
            <Header
                routes={dashboardRoutes}
                brand="Pick a Paw"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white",
                }}
                {...rest}
            />
            <Parallax filter image={require("assets/img/volunteer.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Offer Help</h1>
                            <h4>Volunteer and help the ones in need</h4>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Ask for help</h1>
                            <h4>Let others know you lost a dear friend</h4>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <GridContainer justify="center">
                <GridItem xs={12} className="text-center">
                    <h1 style={{color: "White"}} className="display-4">Volunteer!</h1>
                    <br></br>
                    <p style={{color: "White"}} className="lead">
                        If you want to volunteer, you have come to the right place. Sign up
                        today to help with food, services or any donation you would like!
                    </p>
                </GridItem>
                <GridItem xs={12} sm={8}>
                    <br></br>
                    <CardDeck className="card-deck mb-5 text-center">
                        <Card className="card mb-4 shadow-sm" style={{width: "18rem"}}>
                            <Card.Header>
                                <h4 className="my-0 font-weight-normal">Volunteer</h4>
                            </Card.Header>
                            <Card.Body>
                                {/* <Card.Image>
              </Card.Image> */}
                                <Card.Text>
                                    If you are interested in offering help to anyone who needs it,
                                    you can post an ad describing what help you could give.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-4 shadow-sm" style={{width: "18rem"}}>
                            <Card.Header>
                                <h4 className="my-0 font-weight-normal">Lost pets</h4>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    You lost a pet? Post an ad here and increase your chances to
                                    bring you loved one back home!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </GridItem>
            </GridContainer>
            <div>
                <AddPostForm/>
            </div>
            <div className="sideBySide row">
                <div className="col-md-6">
                    <VolunteerTable ref={volunteer}/>
                </div>
                <div className="col-md-6">
                    <LostTable/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
