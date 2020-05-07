/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

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

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>

        <ListItem className={classes.listItem}>
            <Button
                href="/landing-page"
                color="transparent"
                className={classes.navLink}
            >
                Home
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                href="/login-page"
                color="transparent"
                className={classes.navLink}
            >
                Login
            </Button>
        </ListItem>

        <ListItem className={classes.listItem}>
            <CustomDropdown
                noLiPadding
                buttonText="More"
                buttonProps={{
                    className: classes.navLink,
                    color: "transparent"
                }}
                buttonIcon={Apps}
                dropdownList={[
                    <Link to="/profile-page" className={classes.dropdownLink}>
                        Profile
                    </Link>,
                    <Link to="/adopt-page" className={classes.dropdownLink}>
                        Adopt
                    </Link>,
                    <Link to="/lost-page" className={classes.dropdownLink}>
                        Lost
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
