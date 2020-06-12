import React, { createRef } from "react";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { Button } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
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
        brand="Maynard Pet Shelter"
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
            If you want to volunteer and help all these animals, you have come
            to the right place. Sign up today to help with the shelter, giving a
            foster home or train pets!
          </p>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <br></br>
          <CardDeck className="card-deck mb-5 text-center">
            <Card
              border="secondary"
              className="card mb-4 shadow-sm"
              style={{ width: "18rem" }}
            >
              <Card.Header>
                <h4 className="my-0 font-weight-normal">Volunteer</h4>
              </Card.Header>
              <Card.Body>
                {/* <Card.Image>
              </Card.Image> */}
                <Card.Text>
                  If you are interested in helping in the shelter with
                  everything, from cleaning to playing with the animals, this is
                  the spot for you!
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  type="button"
                  class="btn btn-lg btn-block btn-secondary"
                >
                  Post an ad
                </Button>
              </Card.Footer>
            </Card>
            <Card className="mb-4 shadow-sm" style={{ width: "18rem" }}>
              <Card.Header>
                <h4 className="my-0 font-weight-normal">Lost pets</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  You had many pets and all were disciplined so you figured out
                  you're good at training and you decided it's time to help some
                  other pets prepare for a family life!
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                {/* <GridContainer>
                  <GridItem xs={6}> */}
                <Button
                  style={{ display: "inline-block" }}
                  size="small"
                  type="button"
                  class="btn btn-lg btn-block btn-secondary"
                  onClick={handleOnClick}
                >
                  See lost pets
                </Button>
                <Button
                  style={{ display: "inline-block" }}
                  size="small"
                  type="button"
                  class="btn btn-lg btn-block btn-secondary"
                >
                  Post a lost pet
                </Button>
                {/* </GridItem>
                </GridContainer> */}
              </Card.Footer>
            </Card>
          </CardDeck>
        </GridItem>

        <GridItem xs={12} s={12} m={8}>
          <h3 class="pb-3 mb-4 font-italic border-bottom">
            Services or goods offered by our volunteers
          </h3>
          <div class="blog-post">
            <h2 class="blog-post-title">How I fell in love with animals</h2>
            <p class="blog-post-meta">January 1, 2014 by Mark</p>
            <p>
              This blog post will tell my story about how I used to be scared of
              the tinniest animal, and now I love animals more that anything!
            </p>
            <hr />
            <p>
              You had several pets and all were so are disciplined so you
              figured out you good at training and you decided it's time to help
              some other pets bla bla bla bla bla
            </p>
          </div>
        </GridItem>
        <GridItem xs={12} s={12} m={4}>
          <div ref={volunteer} class="p-3 mb-3 bg-light rounded">
            <h4 class="font-italic">About</h4>
            <p class="mb-0">
              This section is dedicated to stories written by our wonderful
              volunteers. They all have <em>amazing</em> memories that need to
              be told!
            </p>
          </div>
          <div class="p-3">
            <h4 class="font-italic">Archives</h4>
            <ol class="list-unstyled mb-0">
              <li>
                <a href="/home">March 20148</a>
              </li>
              <li>
                <a href="/home">February 2018</a>
              </li>
              <li>
                <a href="/home">January 2018</a>
              </li>
              <li>
                <a href="/home">December 2017</a>
              </li>
              <li>
                <a href="/home">June 2017</a>
              </li>
              <li>
                <a href="/home">May 2017</a>
              </li>
              <li>
                <a href="/home">April 2017</a>
              </li>
            </ol>
          </div>
          <div class="p-3">
            <h4 class="font-italic">Elsewhere</h4>
            <ol class="list-unstyled">
              <li>
                <a href="/home">GitHub</a>
              </li>
              <li>
                <a href="/home">Twitter</a>
              </li>
              <li>
                <a href="/home">Facebook</a>
              </li>
            </ol>
          </div>
        </GridItem>
      </GridContainer>
      <Footer />
    </div>
  );
}
