import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import Form from "react-bootstrap/Form";
import GridItem from "components/Grid/GridItem";
import {Button} from "@material-ui/core";
import SnackbarContent from "../Snackbar/SnackbarContent";
import Check from "@material-ui/core/SvgIcon/SvgIcon";
import {Dropdown} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function SimpleTable() {
    const classes = useStyles();

    const [user_id, setUserId] = useState("");
    const [typeP, setTypeP] = useState("");
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState("");
    const [details, setDetails] = useState("");

    const [successMessage, setSuccessMessage] = useState(false);

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
                setUserId(data._id);
            });
    }, []);

    function addPost() {
        const formData = new FormData();
        if (photo)
            formData.append('photo', photo);
        formData.append('user_id', user_id);
        if (typeP)
            formData.append('type', typeP);
        if (content)
            formData.append('content', content);
        if (details)
            formData.append('details', details);

        const requestOptions = {
            method: "POST",
            headers:{},
            body: formData
        };

        fetch("http://localhost:4000/post/add-post", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 5000);
            });
    }

    function SuccessMessage() {
        return (
            <SnackbarContent
                message={<span>Success! Refresh page to see changes</span>}
                close
                color="success"
                icon={Check}
            />
        );
    }

    const handleSelect = (e) => {
        setTypeP(e)
    }

    return (
        <GridContainer justify="center">
            <GridItem xs={12}>
                <h4 style={{textAlign: "center"}}>Add a new post</h4>
            </GridItem>
            <GridItem xs={4}>
                <Form>
                    {successMessage && <SuccessMessage/>}
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Type</Form.Label>
                        <DropdownButton
                            alignRight
                            title="Choose post type"
                            id="dropdown-menu-align-right"
                            variant="secondary"
                            onSelect={handleSelect}
                        >
                            <Dropdown.Item eventKey="volunteer">Volunteer post</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item eventKey="lost">Lost a pet post</Dropdown.Item>
                        </DropdownButton>
                        <br/>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="textarea"
                                value={typeP}
                            />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            type="textarea"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.File
                            id="exampleFormControlFile1"
                            label="Photo"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Contact details</Form.Label>
                        <Form.Control
                            type="textarea"
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        style={{
                            backgroundColor: "#9c27b0",
                            color: "white",
                            alignContent: "center",
                            marginLeft: "250px"
                        }}
                        color="primary"
                        onClick={() => addPost()}
                    >
                        Add post
                    </Button>
                </Form>
            </GridItem>
        </GridContainer>
    );
}
