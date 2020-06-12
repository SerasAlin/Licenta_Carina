/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import auth from "../../auth";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [name, setName] = useState("");

  function logOut() {
    auth.logout();
  }

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("jwt-token"),
      },
    };

    fetch("http://localhost:4000/user/me", requestOptions)
      .then((response) => response.json())
      .then((data) => handleResponse(data));
  }, []);
  function handleResponse(data) {
    setName(data.username);
  }
  return (
    <List className={classes.list}>
      {auth.isAuthenticated() && (
        <ListItem className={classes.listItem}>
          <Button
            href="/profile-page"
            color="transparent"
            className={classes.navLink}
          >
            Welcome, {name}!
          </Button>
        </ListItem>
      )}
      <ListItem className={classes.listItem}>
        <Button href="/" color="transparent" className={classes.navLink}>
          Home
        </Button>
      </ListItem>

      {!auth.isAuthenticated() && (
        <ListItem className={classes.listItem}>
          <Button
            href="/login-page"
            color="transparent"
            className={classes.navLink}
          >
            Login
          </Button>
        </ListItem>
      )}
      {auth.isAuthenticated() && (
        <ListItem className={classes.listItem}>
          <Button
            href="/login-page"
            color="transparent"
            className={classes.navLink}
            onClick={logOut}
          >
            Logout
          </Button>
        </ListItem>
      )}

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="More"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/profile-page" className={classes.dropdownLink}>
              Profile
            </Link>,
            <Link to="/adopt-page" className={classes.dropdownLink}>
              Adopt
            </Link>,
            <Link to="/volunteer-page" className={classes.dropdownLink}>
              Volunteer
            </Link>,
          ]}
        />
      </ListItem>
    </List>
  );
}
