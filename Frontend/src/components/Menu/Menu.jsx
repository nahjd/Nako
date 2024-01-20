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
import "./Menu.scss"
const Menu = () => {
    const wishlist = useSelector((state) => state.meal.wishlist)
    const basket = useSelector((state) => state.meal.basket)
    const data = useSelector((state) => state.meal.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])
    // console.log(wishlist);
    console.log(basket);

    return (
        <>
            <div className="zort">
                {data && data.map((item, i) => {
                    return (

                        <>

                            <Card key={i} sx={{ maxWidth: 345, border: "1px solid black" }}>

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
                                            dispatch(addWishlist(item))
                                        }}>

                                        {
                                            wishlist.find((elem) => elem._id == item._id) ? <MdOutlineFavorite /> : <GrFavorite />
                                        }
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            dispatch(addBasket(item))
                                        }}

                                        size="small"> Basket</Button>
                                </CardActions>
                            </Card>

                        </>
                    )



                }

                )}</div>

        </>
    )
}

export default Menu