import { useEffect } from "react"
import BestProduct from "../components/BestProduct"
import Category from "../components/Category"
import Header from "../components/Header"
import BASE_URL from "../config"
import axios from "axios"
import { useContext } from "react";
import { myLoginContext } from "../loginContext"
const Home = () => {

  const {setIsLogedIn} = useContext(myLoginContext);
  const getProfile = async () => {
      const token = localStorage.getItem("token");
    const response=await axios.get(`${BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response.data);
    localStorage.setItem("userid", response.data._id);
    localStorage.setItem("username", response.data.name);
    setIsLogedIn(true); 
  };  

useEffect(()=>{
  if (localStorage.getItem("token"))
  {
    getProfile();
  }

}, [])

  return (
    <>
      <Header />
      <Category />
      <BestProduct />
     

    </>
  )
}

export default Home