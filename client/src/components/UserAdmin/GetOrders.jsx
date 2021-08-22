import React , { useEffect, useState }   from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {/*  deleteOrder */ getOrder } from "../../Redux/actions/actions";
import CardOrders from './CardOrders';
import Grid from "@material-ui/core/Grid"; 

const GetOrders = () => {

    const dispatch = useDispatch(); 
    const [select, setSelect] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => { 
        dispatch(getOrder())
      }, [dispatch]);

    useEffect(() => {
      if(select === '...') {
        return setProducts([])
      } 
      const prodFilter = getAll.filter(prod => prod.status === select);
      setProducts(prodFilter)
    }, [select])

    const getAll = useSelector((state) => state.allOrders);
    console.log(getAll)
    const options = ['...','carrito', 'creada', 'procesando', 'cancelado', 'completada']

    /* function handleDeleteOrder(id){
        dispatch(deleteOrder(id))
    }  */
    return (
        <div>
            <div className='list'>  
            <h1>Orders list: </h1>  
        <form>
          <select onChange={(e) => setSelect(e.target.value)}>
              {
                options.map((e) => <option name={e} value={e}>{e}</option>)
              }
          </select>    
        </form>   
            

            {
                products.length > 0 ? 
                products.map((e) =>
                <Grid item key={e._id} xs={12} >
                  <CardOrders 
                  orderId={ e._id} 
                  status={e.status}                  
                  total={e.total}                       
                /* deleteOrder={handleDeleteOrder} */   />
                </Grid>
                )
                :
                getAll.map((e) =>
                <Grid item key={e._id} xs={12} >
                  <CardOrders 
                  orderId={ e._id} 
                  status={e.status}                  
                  total={e.total}                       
                /* deleteOrder={handleDeleteOrder}  */  />
                </Grid>
                )
            } 
            </div>
        </div>
    )
}

export default GetOrders