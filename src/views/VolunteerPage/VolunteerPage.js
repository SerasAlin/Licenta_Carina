import React, { createRef } from "react";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import "views/VolunteerPage/VolunteerPage.css";
import VolunteerTable from "../../components/VolunteerTable/VolunteerTable";
import LostTable from "../../components/LostTable/LostTable";
import AddPostForm from "../../components/AddPostForm/AddPostForm";

const dashboardRoutes = [];

export default function VolunteerPage(props) {
  const { ...rest } = props;
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
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <GridContainer justify="center">
        <GridItem xs={12} className="text-center">
          <h1 className="display-4">Volunteer!</h1>
          <br></br>
          <p className="lead">
            If you want to volunteer, you have come to the right place. Sign up
            today to help with food, services or any donation you would like!
          </p>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <br></br>
          <CardDeck className="card-deck mb-5 text-center">
            <Card className="card mb-4 shadow-sm" style={{ width: "18rem" }}>
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
              <Card.Footer>
                <Button
                  type="button"
                  className="volBtn btn btn-sm btn-secondary float-left"
                  onClick={handleOnClick}
                >
                  Post an ad
                </Button>
                <Button
                  type="button"
                  className="volBtn btn btn-sm btn-secondary float-right"
                  onClick={handleOnClick}
                >
                  See volunteers{" "}
                </Button>
              </Card.Footer>
            </Card>
            <Card className="mb-4 shadow-sm" style={{ width: "18rem" }}>
              <Card.Header>
                <h4 className="my-0 font-weight-normal">Lost pets</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  You lost a pet? Post an ad here and increase your chances to
                  bring you loved one back home!
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                {/* <GridContainer>
                  <GridItem xs={6}> */}
                <Button
                  type="button"
                  className="volBtn btn btn-sm btn-secondary float-left"
                  onClick={handleOnClick}
                >
                  See lost pets
                </Button>
                <Button
                  type="button"
                  className="volBtn btn btn-sm btn-secondary float-right"
                  onClick={handleOnClick}
                >
                  Post a lost pet
                </Button>
                {/* </GridItem>
                </GridContainer> */}
              </Card.Footer>
            </Card>
          </CardDeck>
        </GridItem>
      </GridContainer>
      <div>
        <AddPostForm />
      </div>
      <div className="sideBySide row">
        <div className="col-md-6">
          <VolunteerTable ref={volunteer} />
        </div>
        <div className="col-md-6">
          <LostTable />
        </div>
      </div>
      <Footer />
    </div>
  );
}
