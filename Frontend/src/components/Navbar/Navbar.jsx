import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import "./Navbar.scss"
const Navbar = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1, position: "absolute", }}>
                <AppBar style={{ position: "absolute", width: "100%", zIndex: "5" }} position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >

                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                        </Typography>
                        <Link to="/add"> <Button color="inherit">Add</Button></Link>
                        <Link to="/wishlist"> <Button color="inherit">Wishlist</Button></Link>
                        <Link to="/basket"> <Button color="inherit">Basket</Button></Link>
                        <Button color="inherit">Login</Button>

                    </Toolbar>
                </AppBar>
            </Box>
        </>

    )
}

export default Navbar