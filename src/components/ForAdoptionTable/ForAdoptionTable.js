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
import classNames from "classnames";
import SnackbarContent from "../Snackbar/SnackbarContent";
import Check from "@material-ui/core/SvgIcon/SvgIcon";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable() {
  const classes = useStyles();

  const [pets, setPets] = useState([]);

  const [updated, setUpdated] = useState(false);

  const [tag, setTag] = useState("");
  const [namePet, setNamePet] = useState("");
  const [type, setType] = useState("");
  const [photoPet, setPhotoPet] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");

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
        const getMyPetsForAdoptionOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            master_id: memberProfileId,
          },
        };
        fetch(
          "http://localhost:4000/animal/my-animals",
          getMyPetsForAdoptionOptions
        )
          .then((response) => response.json())
          .then((data) => {
            setPets((pets) => pets.concat(data));
            console.log(pets);
          });
      });
  }, []);

  function SuccessMessage() {
    return (
      <SnackbarContent
        message={<span>Update successful!</span>}
        close
        color="success"
        icon={Check}
      />
    );
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <h3> Pets you posted for adoption </h3>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Photo</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Tag</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map(
              (pet) =>
                pet.status === "For adoption" && (
                  <TableRow key={pet.tag}>
                    <TableCell component="th" scope="row">
                      <div>
                        <img
                          style={imageStyle}
                          src={`../img/${pet.photo}`}
                          alt="..."
                          className={imageClasses}
                        />
                      </div>
                    </TableCell>
                    <TableCell align="center">{pet.name}</TableCell>
                    <TableCell align="center">{pet.type}</TableCell>
                    <TableCell align="center">{pet.age}</TableCell>
                    <TableCell align="center">{pet.tag}</TableCell>
                    <TableCell align="center">{pet.status}</TableCell>
                    <TableCell align="center">
                      <Button>Update</Button>
                      <Button>Delete</Button>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h4>Add a new pet for adoption</h4>
      <GridContainer justify="center">
        <GridItem xs={8}>
          <Form>
            {updated && <SuccessMessage />}
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNamePet(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cat/Dog"
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Pet photo"
                value={photoPet}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type="text"
                placeholder="Metis"
                onChange={(e) => setBreed(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                type="text"
                placeholder="M/F"
                onChange={(e) => setSex(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Years/Months"
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unique tag"
                onChange={(e) => setTag(e.target.value)}
              />
            </Form.Group>
            <Button>Add pet for adoption</Button>
          </Form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
