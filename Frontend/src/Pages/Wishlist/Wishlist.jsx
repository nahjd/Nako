
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlist, deleteWishlist, fetchData } from '../../redux/Slice/userSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Wishlist.scss"
const Wishlist = () => {
    const wishlist = useSelector((state) => state.meal.wishlist)
    const data = useSelector((state) => state.meal.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])
    // console.log(data);
    console.log(wishlist);
    return (
        <>
            <h1>Wishlist</h1>
            {wishlist && wishlist.map((item, i) => {
                return (
                    <>
                        <Card
                            key={item._id}
                            sx={{ maxWidth: 345, border: "1px solid black" }}>

                            <CardMedia
                                sx={{ height: 240, width: 340 }}
                                image={item.image}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.about}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={() => {
                                        dispatch(deleteWishlist(item))
                                    }}
                                    size="small">Wishlist</Button>
                                <Button size="small"> Button</Button>
                            </CardActions>
                        </Card>
                    </>
                )
            })}

        </>
    )
}

export default Wishlist