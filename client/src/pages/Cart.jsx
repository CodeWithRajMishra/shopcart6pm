import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import BASE_URL from "../config";
const Cart = () => {
const proData= useSelector(state=>state.mycart.cart);
const dispatch= useDispatch();


 const ans= proData.map((key)=>{
  return(
    <>
    
    <tr>
           <td> 
           <img src={`${BASE_URL}/${key.defaultImage}`} style={{ width: 50, height: 50 }} alt="Uploaded File" />
           </td>   
           <td>  {key.name} </td>
            <td> {key.brand} </td>
           
            <td> {key.description} </td>
            <td> {key.price} </td>
            <td>  {key.qnty} </td>
            <td> {key.price * key.qnty} </td>
            <td> 
               <Button> Remove </Button>

            </td>
         </tr>
      
    </>
  )
 })

  return (
      
    <>
     <h4> Update Product</h4>
          <Table striped bordered hover style={{fontSize:"12px"}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Brand</th>
       
          <th>Description</th>
          <th>Price</th>
          <th> Quantity </th>
          <th> Total Amount</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
       {ans}
      </tbody>
      </Table>

    
    </>
  )
}

export default Cart