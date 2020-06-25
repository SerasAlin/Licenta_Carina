import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

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
    width: "100px",
    height: "100px",
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
            console.log(posts);
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
                    {post.photo}
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
