import React, { useEffect }  from 'react'
import {useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardCart from './CardCart';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {updateCart} from '../../Redux/actions/actions'
import { deleteCart, sumProduct, resProduct, sumaPrecioTotal, sumaCantidadTotal } from './utilsCarts';


const useStyles = makeStyles(() => ({
    root: {
      // marginLeft: 40
      margin:'auto',
      height:'auto',
      maxWidth:1024,
    },
    color:{
      color:"white"
    }
    
  }));

const Cart = () => {
  const dispatch = useDispatch();

  const carts = useSelector(state => state.order);
  //const carts = JSON.parse(localStorage.getItem('order'))
  useEffect(() => {
    if(carts.length <= 0){
      if(localStorage.getItem('order')){
        let object = JSON.parse(localStorage.getItem('order'));
        dispatch(updateCart(object));
      }
    }
  },[dispatch, carts])

  function handleDeleteCart(id){
    const delet = deleteCart(id)
    const cantidadTotal = sumaCantidadTotal(delet);
    //console.log("TOTAL", sumaProductos);
    dispatch(updateCart(delet))
  }

  function handleAdd(id){
    const sum = sumProduct(id)
    const cantidadTotal = sumaCantidadTotal(sum);
    //console.log("TOTAL", sumaProductos);
    dispatch(updateCart(sum))
  }

  function handleRes(id){
    const resta = resProduct(id)
    const cantidadTotal = sumaCantidadTotal(resta);
    //console.log("TOTAL", sumaProductos);
    dispatch(updateCart(resta))
  }

  function deleteCompleteOrder(){
    localStorage.removeItem('order');
    dispatch(updateCart([]));
  }  

  const classes = useStyles();

  const precioTotal = sumaPrecioTotal(carts);
   

  return (
    <div >
      <h1 className={classes.color}>THIS IS YOUR CART</h1>
      <IconButton onClick={() => deleteCompleteOrder()}>
        <Typography className={classes.color}>
          Falta alert de mensaje: Esto borra toda la orden CUIDADO CON EL PERRO, PERROOOO!!!!!
        </Typography>
        <DeleteIcon className={classes.color}/>
      </IconButton>
      <Grid container  className={classes.root} spacing={2}>
          {
            carts? carts.map(e => (
                  <Grid item key={e.CardCartid} xs={12} >
                    <CardCart id={e.id}
                      name={e.name} description={e.description} count={e.count}
                      image={e.image} price={e.price} 
                      deleteCart={handleDeleteCart} addProduct={handleAdd} resProduct={handleRes}/>
                  </Grid>
                ))
                : <h1>  </h1>
          }
      </Grid>
      <h1 className={classes.color}>TOTAL: ${precioTotal}</h1>
    </div>
  )
};

export default Cart
