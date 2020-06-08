import React from "react";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
const dashboardRoutes = [];

export default function VolunteerPage(props) {
  const { ...rest } = props;

  return (
    <div className="main">
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
      <div class="container volunteer-header my-4 py-4">
        <div class="row">
          <div class="col-12 text-center mx-auto">
            <h1 class="display-4">Volunteer!</h1>
            <p class="lead">
              If you want to volunteer and help all these animals, you have come
              to the right place. Sign up today to help with the shelter, giving
              a foster home or train pets!
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6"></div>
        </div>
        <CardDeck class="card-deck mb-5 text-center">
          <Card class="card mb-4 shadow-sm">
            <Card.Title class="card-header">
              <h4 class="my-0 font-weight-normal">Shelter</h4>
            </Card.Title>
            <Card.Body class="card-body">
              {/* <Card.Image>
              </Card.Image> */}
              <Card.Text>
                If you are interested in helping in the shelter with everything,
                from cleaning to playing with the animals, this is the spot for
                you!
              </Card.Text>
              <button
                type="button"
                class="btn btn-lg btn-block btn-secondary"
                data-toggle="modal"
                data-target="#myModal"
              >
                Volunteer at shelter!
              </button>
            </Card.Body>
          </Card>
          {/* <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Foster</h4>
            </div>
            <div class="card-body">
              <p>
                You want a pet but you can only keep it for a short time? If you
                would like to help a pet be happy until he finds a permanent
                home, you could foster!
              </p>
              <a href="/adopt">
                <button
                  type="button"
                  class="btn btn-lg btn-block btn-secondary"
                >
                  Volunteer to foster!
                </button>
              </a>
            </div>
          </div> */}
          <Card class="card mb-4 shadow-sm">
            <Card.Title class="card-header">
              <h4 class="my-0 font-weight-normal">Training</h4>
            </Card.Title>
            <Card.Body class="card-body">
              <Card.Text>
                You had many pets and all were disciplined so you figured out
                you're good at training and you decided it's time to help some
                other pets prepare for a family life!
              </Card.Text>
              <button
                type="button"
                class="btn btn-lg btn-block btn-secondary"
                data-toggle="modal"
                data-target="#myModal"
              >
                Volunteer to train!
              </button>
            </Card.Body>
          </Card>
        </CardDeck>
        <div class="row mt-5">
          <div class="col-md-8">
            <h3 class="pb-3 mb-4 font-italic border-bottom">
              From the volunteers
            </h3>
            <div class="blog-post">
              <h2 class="blog-post-title">How I fell in love with animals</h2>
              <p class="blog-post-meta">January 1, 2014 by Mark</p>
              <p>
                This blog post will tell my story about how I used to be scared
                of the tinniest animal, and now I love animals more that
                anything!
              </p>
              <hr />
              <p>
                You had several pets and all were so are disciplined so you
                figured out you good at training and you decided it's time to
                help some other pets bla bla bla bla bla
              </p>
            </div>
          </div>
          <aside class="col-md-4 blog-sidebar">
            <div class="p-3 mb-3 bg-light rounded">
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
          </aside>
        </div>
      </div>
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Send a message to the shelter staff.</h5>
              <button type="button" class="close" data-dismiss="modal" />
            </div>
            <div class="modal-body">
              <textarea class="form-control" />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
