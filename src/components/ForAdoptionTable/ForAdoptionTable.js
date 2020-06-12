import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Form from "react-bootstrap/Form";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "../CustomButtons/Button.js";
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

let specificTag;

export default function SimpleTable(props) {
    const classes = useStyles();

    const [pets, setPets] = useState([]);

    const [successMessage, setSuccessMessage] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    //General variables for pets in general
    const [masterId, setMasterId] = useState("");
    const [story, setStory] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [photo, setPhoto] = useState("");
    const [age, setAge] = useState("");
    const [tag, setTag] = useState("");
    const [breed, setBreed] = useState("");
    const [sex, setSex] = useState("");

    //Specific variables for specific pet
    const [specificStory, setSpecificStory] = useState("");
    const [specificName, setSpecificName] = useState("");
    const [specificType, setSpecificType] = useState("");
    const [specificPhoto, setSpecificPhoto] = useState("");
    const [specificAge, setSpecificAge] = useState("");
    const [specificBreed, setSpecificBreed] = useState("");
    const [specificSex, setSpecificSex] = useState("");

    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    var imageStyle = {
        width: "60px",
        height: "60px",
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
                setMasterId(data._id);
                let master_id = data._id;
                console.log(master_id);
                const getMyPetsForAdoptionOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        master_id: master_id,
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

    function addPetSubmit() {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                type: type,
                status: "For adoption",
                age: age,
                tag: tag,
                master_id: masterId,
                story: story,
                breed: breed,
                sex: sex,
            }),
        };

        fetch("http://localhost:4000/animal/register-animal", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 2000);
            });
    }

    function openUpdateForm(petTag) {
        const getPetRequestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'tag': petTag
            }
        };
        specificTag = petTag;

        fetch('http://localhost:4000/animal/pet-page', getPetRequestOptions)
            .then(response => response.json())
            .then(data => {
                setSpecificPetInfo(data);
                setShowUpdateForm(true);
            });
    }

    function setSpecificPetInfo(data) {
        setSpecificAge(data.age);
        setSpecificBreed(data.breed);
        setSpecificName(data.name);
        setSpecificPhoto(data.photo);
        setSpecificSex(data.sex);
        setSpecificStory(data.story);
        setSpecificType(data.type);

    }

    function updatePetSubmit() {
        console.log(specificTag);
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'tag': specificTag
            },
            body: JSON.stringify({
                name: specificName,
                type: specificType,
                age: specificAge,
                story: specificStory,
                breed: specificBreed,
                sex: specificSex,
            }),
        };

        fetch("http://localhost:4000/animal/update-animal", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 2000);
            });
    }

    function openRegisterForm() {
        setShowUpdateForm(false);
    }

    function deletePet(tag) {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'tag': tag
            }
        };

        fetch("http://localhost:4000/animal/delete-animal", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 2000);
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

    return (
        <div>
            <TableContainer component={Paper}>
                <h3> Pets you posted for adoption </h3>
                {
                    showUpdateForm &&
                    <Button onClick={() => openRegisterForm()} color="primary">Register new pet for adoption</Button>
                }
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Photo</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Breed</TableCell>
                            <TableCell align="center">Sex</TableCell>
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
                                        <TableCell align="center" component="th" scope="row">
                                            {
                                                pet.photo &&
                                                <img style={imageStyle} src={`../img/${pet.photo}`} alt="..."
                                                     className={imageClasses}/>
                                            }
                                            {
                                                !pet.photo &&
                                                <img style={imageStyle} src={`../img/faces/dummyPetAvatar.png`} alt="..."
                                                     className={imageClasses}/>
                                            }
                                        </TableCell>
                                        <TableCell align="center">{pet.name}</TableCell>
                                        <TableCell align="center">{pet.type}</TableCell>
                                        <TableCell align="center">{pet.breed}</TableCell>
                                        <TableCell align="center">{pet.sex}</TableCell>
                                        <TableCell align="center">{pet.age}</TableCell>
                                        <TableCell align="center">{pet.tag}</TableCell>
                                        <TableCell align="center">{pet.status}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => openUpdateForm(pet.tag)} color="primary">Update</Button>
                                            <Button onClick={() => deletePet(pet.tag)} color="primary">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <br/>
            {successMessage && <SuccessMessage/>}
            {
                showUpdateForm &&
                <GridContainer justify="center">
                    <h4>Update {specificTag} pet information</h4>
                    <GridItem xs={8}>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={specificName}
                                    value={specificName}
                                    onChange={(e) => setSpecificName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={specificType}
                                    value={specificType}
                                    onChange={(e) => setSpecificType(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    id="exampleFormControlFile1"
                                    label="Pet photo"
                                    onChange={(e) => setSpecificPhoto(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Breed</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={specificBreed}
                                    value={specificBreed}
                                    onChange={(e) => setSpecificBreed(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Sex</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={specificSex}
                                    value={specificSex}
                                    onChange={(e) => setSpecificSex(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={specificAge}
                                    value={specificAge}
                                    onChange={(e) => setSpecificAge(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Story</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    placeholder={specificStory}
                                    value={specificStory}
                                    onChange={(e) => setSpecificStory(e.target.value)}
                                />
                            </Form.Group>
                            <Button color="primary" onClick={() => updatePetSubmit()}>Update</Button>
                        </Form>
                    </GridItem>
                </GridContainer>
            }
            {
                !showUpdateForm &&
                <GridContainer justify="center">
                    <h4>Add a new pet for adoption</h4>
                    <GridItem xs={8}>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Pet name"
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => setPhoto(e.target.value)}
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
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Story</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    placeholder="Pet life story"
                                    onChange={(e) => setStory(e.target.value)}
                                />
                            </Form.Group>
                            <Button color="primary" onClick={() => addPetSubmit()}>Add</Button>
                        </Form>
                    </GridItem>
                </GridContainer>
            }
        </div>
    );
}
