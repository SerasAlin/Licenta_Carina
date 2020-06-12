import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classNames from "classnames";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function SimpleTable() {
    const classes = useStyles();

    const [pets, setPets] = useState([]);

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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("jwt-token")
            }
        };

        fetch('http://localhost:4000/user/me', getMemberIdOptions)
            .then(response => response.json())
            .then(data => {
                let memberProfileId = data._id;
                console.log(memberProfileId);
                const getMyPetsForAdoptionOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'master_id': memberProfileId
                    }
                };
                fetch('http://localhost:4000/animal/my-animals', getMyPetsForAdoptionOptions)
                    .then(response => response.json())
                    .then( data => {
                        setPets(pets => pets.concat(data));
                        console.log(pets);
                    })
            });

    }, []);

    return (
        <TableContainer component={Paper}>
            <h3>
                Pets you adopted
            </h3>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Photo</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Tag</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pets.map((pet) => (
                        pet.status === "Adopted" &&
                        <TableRow key={pet.tag}>
                            <TableCell component="th" scope="row">
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
                            </TableCell>
                            <TableCell align="center">{pet.name}</TableCell>
                            <TableCell align="center">{pet.type}</TableCell>
                            <TableCell align="center">{pet.age}</TableCell>
                            <TableCell align="center">{pet.tag}</TableCell>
                            <TableCell align="center">{pet.status}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}