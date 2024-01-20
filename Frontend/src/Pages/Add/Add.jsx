import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect } from "react"
import * as Yup from 'yup';
import { fetchData, fetchDelete, fetchPost } from '../../redux/Slice/userSlice';


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

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])
    console.log(data);
    return (
        <>
            Add
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
                        {data.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.about}</TableCell>
                                <TableCell align="right">{row.image}</TableCell>

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