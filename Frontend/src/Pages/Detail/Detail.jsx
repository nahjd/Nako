import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBasket, addWishlist, fetchData } from '../../redux/Slice/userSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useParams } from 'react-router';
const Detail = () => {
    const { id } = useParams()
    console.log(id);
    const wishlist = useSelector((state) => state.meal.wishlist)
    const basket = useSelector((state) => state.meal.basket)
    const data = useSelector((state) => state.meal.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])
    // console.log(wishlist);
    console.log(basket);

    const found = data.find(item => item._id == id)
    console.log(found);

    return (
        <Card sx={{ maxWidth: 345, border: "1px solid black" }}>
            {found && (<>
                <CardMedia
                    sx={{ height: 240, width: 340 }}
                    image={found.image}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {found.about}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {found.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => {
                            dispatch(addWishlist(found))
                        }}>

                        {
                            wishlist.find((elem) => elem._id == found._id) ? <MdOutlineFavorite /> : <GrFavorite />
                        }
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(addBasket(found))
                        }}

                        size="small"> Basket</Button>

                </CardActions>
            </>

            )

            }
        </Card>


    )
}

export default Detail