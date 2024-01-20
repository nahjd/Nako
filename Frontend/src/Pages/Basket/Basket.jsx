import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBasket, addWishlist, decreaseBasket, deleteBasket, fetchData, increaseBasket } from '../../redux/Slice/userSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Basket = () => {

    const basket = useSelector((state) => state.meal.basket)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    console.log(basket);
    return (
        <>
            <h1>Basket</h1>
            {basket && basket.map((item, i) => {
                return (
                    <>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={item.image}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.about}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => {
                                    dispatch(increaseBasket(item))
                                }} size="small">+</Button>
                                <Button>{item.quantity}</Button>
                                <Button
                                    onClick={() => {
                                        item.quantity > 1 ?
                                            dispatch(decreaseBasket(item)) : null
                                    }}
                                    size="small">-</Button>
                                <Button
                                    onClick={() => {
                                        dispatch(deleteBasket(item))
                                    }}
                                >Delete</Button>
                                <Button

                                >
                                    {Number(item.price) * item.quantity}
                                </Button>
                            </CardActions>
                        </Card>
                    </>
                )
            })}

        </>
    )
}

export default Basket