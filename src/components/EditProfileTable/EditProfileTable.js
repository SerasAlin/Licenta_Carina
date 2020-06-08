import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Form from "react-bootstrap/Form";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable() {
  const classes = useStyles();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

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
    setId(data._id);
    setName(data.username);
    setEmail(data.email);
    //setPhoto(data.photo);
    setCity(data.city);
    setDesc(data.desc);
    setPhone(data.phone);
  }

  function handleSubmit(event) {
    setName({ name: event.target.value });
    setEmail({ email: event.target.value });
    setPhoto({ photo: event.target.value });
    setCity({ city: event.target.value });
    setDesc({ desc: event.target.value });
    setPhone({ phone: event.target.value });
  }

  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder={name} value={name} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder={email} value={email} />
      </Form.Group>
      <Form.Group>
        <Form.File
          id="exampleFormControlFile1"
          label="Profile photo"
          value={photo}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="text" placeholder={phone} value={phone} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder={city} value={city} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="3" placeholder={desc} value={desc} />
      </Form.Group>
      <Button onClick={handleSubmit}>Update profile</Button>
    </Form>
  );
}