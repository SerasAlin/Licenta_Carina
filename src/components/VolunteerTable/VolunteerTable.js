import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "../CustomButtons/Button.js";
import classNames from "classnames";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function VolunteerTable(props) {
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
      <TableContainer component={Paper}>
        <h3 style={{ textAlign: "center" }}> Volunteer ads </h3>
        <div className={classes.profile}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Content</TableCell>
                <TableCell align="center">Contact Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map(
                (post) =>
                  post.type === "volunteer" && (
                    <TableRow key={post._id}>
                      <TableCell align="center" component="th" scope="row">
                        <img
                            style={imageStyle}
                            src={`http://localhost:4000/${post.photo}`}
                            alt="..."
                            className={imageClasses}
                        />
                      </TableCell>
                      <TableCell align="center">{post.content}</TableCell>
                      <TableCell align="center">{post.details}</TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  );
}
