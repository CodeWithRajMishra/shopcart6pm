import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from '../config';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UpdateProduct=()=>{

    const [mydata, setMydata]= useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; // Change as needed
   const loadData=async(pageNumber)=>{
    const api=`${BASE_URL}/admin/productdisplay?page=${pageNumber}&limit=${limit}`;
    try {
         const response= await axios.get(api);
         console.log(response.data);
         setMydata(response.data);
    } catch (error) {
         console.log(error);
    }
   }

const ans=mydata.map((key)=>{
     return(
        <>
         <tr>
           <td> 
           <img src={`${BASE_URL}/${key.defaultImage}`} style={{ width: 50, height: 50 }} alt="Uploaded File" />
           </td>   <td> 
          
            {key.name} </td>
            <td> {key.brand} </td>
            <td> {key.price} </td>
            <td> {key.description} </td>
            <td> {key.category} </td>
            <td> {key.subcategory} </td>
            <td> {key.status} </td>
            <td> {key.ratings} </td>
            <td>
                {key.status=="normal"? (<>
                    <Button variant="warning" size="sm" onClick={(e)=>{handlePrimary(e, key._id)}}>Primary</Button>
                 </>) : (<>
                    <Button variant="success" size="sm" onClick={(e)=>{handleNormal(key._id)}}>Noraml</Button>
                  </>)}           
            </td>
         </tr>
        </>
     )
})
useEffect(()=>{
    loadData();
}, []);
const handlePrimary=async(e, id)=>{
    e.preventDefault();
    const api=`${BASE_URL}/admin/productmakeprimary`;
    try {
         const response= await axios.post(api, {id:id});
         console.log(response.data);
    } catch (error) {
         console.log(error);
    }
    loadData();
}

const handleNormal = async(id)=>{
    const api=`${BASE_URL}/admin/productmakenormal`;
    try {
         const response= await axios.post(api, {id:id});
         console.log(response.data);
    } catch (error) {
         console.log(error);
    }
    loadData();
}


    return(
        <>
          <h4> Update Product</h4>
          <Table striped bordered hover style={{fontSize:"12px"}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Sub Cat</th>
          <th>Status</th>
          <th>Rating</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
       {ans}
      </tbody>
      </Table>
      {/* Pagination Controls */}
      <div>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                <span> Page {page} of {totalPages} </span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </>
    )
}

export default UpdateProduct;