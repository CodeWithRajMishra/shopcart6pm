import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import axios from "axios";


const CheckOut=()=>{
  const [mydata, setMydata] = useState({});
  const navigate= useNavigate();
  useEffect(()=>{
      if (!localStorage.getItem("username"))
      {
        navigate("/userlogin");
      }

      loadData();
  }, [])

  const loadData=async()=>{
    const api=`${BASE_URL}/user/getuserdetail`;
    const response = await axios.post(api, {id:localStorage.getItem("userid")});
    console.log(response.data);
    setMydata(response.data);
  }






  return(
        <> 
          <h1 align="center">  Check out Page </h1>
          <div className="mysummery">
          {mydata.address}
          Customer name : <input type="text" value={mydata.name} />
          <br />
          Shipping Address : <input type="text" value={mydata.address} />
          <br />
          Contact no : <input type="text" value={mydata.contact} />

          </div>
        </>
    )
}
export default CheckOut;