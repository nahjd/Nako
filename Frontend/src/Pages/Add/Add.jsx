import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react"
import * as Yup from 'yup';
import { Helmet } from "react-helmet";
import { fetchData, fetchDelete, fetchPost } from '../../redux/Slice/userSlice';
import "./Add.scss"

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    about: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    image: Yup.string().required('Required'),
});


const Add = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.meal.data)
    const [search, setSearch] = useState("")
    const [type, setType] = useState("")
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])
    console.log(data);
    const filteredData = () => {
        if (type == "az") {
            return [...data].sort((a, b) => a.name.localeCompare(b.name))
        }
        if (type == "za") {
            return [...data].sort((a, b) => b.name.localeCompare(a.name))
        }
        else if (type == "price") {
            return [...data].sort((a, b) => Number(a.price) - Number(b.price))
        }
        else {
            return data
        }

    }


    return (
        <>

            <div className="table">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Add</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" onClick={(e) => {
                    setSearch(e.target.value)
                }} />
                <Button
                    onClick={() => {
                        setType("az")
                    }}

                    variant="outlined">A-Z</Button>
                <Button
                    onClick={() => {
                        setType("za")
                    }}

                    variant="outlined">Z-A</Button>
                <Button
                    onClick={() => {
                        setType("price")
                    }}

                    variant="outlined">Price</Button>

                <Button
                    onClick={() => {
                        setType("")
                    }}

                    variant="outlined">Default</Button>
            </div>

            <Formik
                initialValues={{
                    name: '',
                    about: '',
                    image: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    dispatch(fetchPost(values))
                    console.log(values);
                }}
            >
                {({ errors, touched, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field name="name" />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <Field name="about" />
                        {errors.about && touched.about ? (
                            <div>{errors.about}</div>
                        ) : null}
                        <Field name="image" type="text" />
                        {errors.image && touched.image ? <div>{errors.image}</div> : null}
                        <button type="submit">Add</button>
                    </Form>
                )}
            </Formik>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData().filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map((row) => (

                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.about}</TableCell>
                                <TableCell align="right">{row.image}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>

                                <TableCell style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        dispatch(fetchDelete(row._id))
                                    }}
                                    align="right">Delete</TableCell>
                            </TableRow>

                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Add