import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaStar } from "react-icons/fa";
import InnerImageZoom from "react-inner-image-zoom";
import Zoom from "react-medium-image-zoom";
import BASE_URL from "../config";
import axios from "axios";
import { PiCurrencyInrThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Button, message, Modal } from 'antd';

const ShowProductDetail=()=>{
    const {id} = useParams();
    const [myPro, setMyPro] = useState({});
    const [similarPro, setSimilarPro] = useState([]);
    const [largeImg, setLargeImg] = useState(myPro.defaultImage);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [proRating, setProRating] = useState(0);
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleSubmitRate = async() => {
        const api=`${BASE_URL}/product/productratings`;
        try {
            const response= await axios.post(api,
                 {ratings:proRating, name:localStorage.getItem("username"), userid:localStorage.getItem("userid")});
            console.log(response.data);
            setIsModalOpen(false)
       } catch (error) {
            message.error(error.response.data.msg);
       }
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    const loadData=async()=>{
        const api=`${BASE_URL}/product/showfullproduct/?id=${id}`;
        try {
             const response= await axios.get(api);
             console.log(response.data);
             setMyPro(response.data);
             setLargeImg(response.data.defaultImage)
            loadData1(response.data.category);
        } catch (error) {
             console.log(error);
        }
       }

       useEffect(()=>{
        loadData();
    }, [id]);


    const showFullProduct=(id)=>{
        navigate(`/showfullproduct/${id}`)
   }
    const loadData1=async(cate)=>{
        const api1=`${BASE_URL}/product/prolist/?cate=${cate}`;
        try {
            const response1= await axios.get(api1);
            console.log(response1.data);  
            setSimilarPro(response1.data);
       } catch (error) {
            console.log(error);
       }
    }


    const ans=similarPro.map((key1)=>{
         return(
            <>
              <div style={{margin:"10px"}}>
              <img src={`${BASE_URL}/${key1.defaultImage}`} 
               onClick={()=>{showFullProduct(key1._id)}}
                style={{width:"150px",height:"150px", border:"3px solid lightblue", padding:"2px", cursor:"pointer"}} alt="Uploaded File" />
                <br />
                Product : {key1.name}
                <br />
                <b> Price : <PiCurrencyInrThin/> {key1.price} </b>
              </div>
            </>
         )
    })
   

    return(
        <>
          <h1> Show Product Detail </h1> 
          <div  style={{display:"flex", padding:"50px", justifyContent:"space-around", width:"90%", margin:"auto"}}>
            <div style={{width:"10%"}}>
            { myPro.images && myPro.images.map((key)=>{
                return(
                    <>
         <p>
          <img src={`${BASE_URL}/${key}`} 
          onMouseOver={()=>{setLargeImg(key)}}
          style={{width:"40px",height:"40px", border:"3px solid lightblue", padding:"2px", cursor:"pointer"}} alt="Uploaded File" />
         </p>
    
        </>
                )
            })}
          </div> 
          <div style={{paddingRight:"20px"}}>

           
            
            <img src={`${BASE_URL}/${largeImg}`} 
            style={{ width:"400px", height:"400px" }} alt="Uploaded File" />
            
          
            </div>
            <div style={{textAlign:"left", width:"100%"}}>
             <h2> Product name : {myPro.name} </h2>
             <h3  style={{color:"blue"}}> Price :  {myPro.price}</h3>
             <h5> Description : {myPro.description} </h5>
            <i>Ratings : </i> 
              {[...Array(myPro.ratings)].map((_, index) => (
                <FaStar key={index} className="star-icon" />
               ))}
              <br /><br />
              <Button onClick={showModal} >Give your Rate</Button>
              
               <hr />
               <Button type="primary">Add to Cart</Button>
              
            </div>
            
          </div>     
          <hr />  
          <h2> Similar Products</h2>
          <div style={{display:"flex"}}>
          {ans}
          </div>

          <Modal title="Give Product Rating" open={isModalOpen} 
          onOk={handleSubmitRate} onCancel={handleCancel} >
            Select Your  Rate: <select value={proRating} onChange={(e)=>{setProRating(e.target.value)}}>
                          <option> 0 </option>
                          <option> 1 </option>
                          <option> 2 </option>
                          <option> 3 </option>
                          <option> 4 </option>
                          <option> 5 </option>
                       </select>
          </Modal>
          
        </>
    )
}
export default ShowProductDetail;