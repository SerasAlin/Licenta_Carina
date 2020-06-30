import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import TableCell from "../VolunteerTable/VolunteerTable";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function LostTable(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [posts, setPosts] = useState([]);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  var imageStyle = {
    width: "120px",
    height: "80px",
  };

  useEffect(() => {
    const getMemberIdOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("jwt-token"),
      },
    };

    fetch("http://localhost:4000/user/me", getMemberIdOptions)
      .then((response) => response.json())
      .then((data) => {
        let memberProfileId = data._id;
        console.log(memberProfileId);
        fetch("http://localhost:4000/post/all-posts")
          .then((response) => response.json())
          .then((data) => {
              data.forEach(posts => {
                  if (posts.photo === "") {
                      posts.photo = "uploads/img/faces/dummyPetAvatar.png";
                  }
              });
            setPosts((posts) => posts.concat(data));
            console.log(posts);
          });
      });
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}> Lost pets </h3>
      <div className={classes.profile}>
        <CardDeck>
          {posts.map(
            (post) =>
              post.type === "lost" && (
                <Card style={{ marginLeft: "30px" }} key={post._id}>
                  <Card.Body align="center">
                      <img
                          style={imageStyle}
                          src={`http://localhost:4000/${post.photo}`}
                          alt="..."
                          className={imageClasses}
                      />
                    <br></br>
                    {post.content}
                  </Card.Body>
                  <Card.Footer align="center">{post.details}</Card.Footer>
                </Card>
              )
          )}
        </CardDeck>
      </div>
    </div>
  );
}
