import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import BASE_URL from "../config";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { PiCurrencyInr } from "react-icons/pi";
import { FaMoneyCheck } from "react-icons/fa";
import {qntyIncrease, qntyDecrease, productRemove} from "../redux/cartSlice";
import { useNavigate} from "react-router-dom";

const Cart = () => {
const proData= useSelector(state=>state.mycart.cart);
const dispatch= useDispatch();
const navigate= useNavigate();

let totalAmount=0;

const ans= proData.map((key)=>{
    totalAmount+=key.price * key.qnty;
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
           <td> 
              <FaMinusCircle onClick={()=>{dispatch(qntyDecrease({id:key.id}))}} />
                   {key.qnty} 
               <FaPlusCircle onClick={()=>{dispatch(qntyIncrease({id:key.id}))}} />               
               </td>
            <td> {key.price * key.qnty} </td>
            <td> 
               <Button onClick={()=>{dispatch(productRemove({id:key.id}))}}> 
                Remove                
              </Button>
            </td>
         </tr>
    </>
  )
 })
  return (   
    <>
     <h4> Update Product</h4>
    <center>
      <div  style={{color:"green", fontWeight:"bold", fontSize:"20px"}}>
      <PiCurrencyInr /> : {totalAmount}
      </div>
    </center>
    <div  style={{color:"green", textAlign:"right", paddingRight:"30px",fontSize:"20px"}}>       
       <Button variant="success" onClick={()=>{navigate("/checkout")}}> 
       <FaMoneyCheck  /> Checkout </Button>
      </div>
     <br /> <br />
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