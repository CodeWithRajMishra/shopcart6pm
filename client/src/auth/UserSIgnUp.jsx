import { Link } from "react-router-dom";
import "../css/Signup.css";
import { useEffect, useState } from "react";
import BASE_URL from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
const [input, setInput] = useState({});
const navigate= useNavigate();


useEffect(()=>{
        if (localStorage.getItem("username"))
        {
            navigate("/home");
        }

}, [])


const handleInput=(e)=>{
    let name=e.target.name;
    let value= e.target.value;
    setInput(values=>({...values, [name]:value}));
    console.log(input);
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    const api=`${BASE_URL}/user/usersave`;
   
    try {
         const response= await axios.post(api, input);
         console.log(response);
         navigate("/userlogin")
    } catch (error) {
         console.log(error);
    }
}



    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">Sign Up</h2>
                <form className="signup-form">
               <input type="text" name="name" placeholder="Full Name" className="signup-input"
                    value={input.name} onChange={handleInput} />
                    <input type="text" name="address" placeholder="Shipping Address" className="signup-input" 
                    value={input.address} onChange={handleInput} />
                    <input type="text" name="city" placeholder="city" className="signup-input" 
                    value={input.city} onChange={handleInput} />
                    <input type="text" name="contact" placeholder="contact no" className="signup-input" 
                    value={input.contact} onChange={handleInput} />
                    <input type="email" name="email" placeholder="Email" className="signup-input" 
                    value={input.email} onChange={handleInput} />
                    <input type="password" name="password" placeholder="Password" className="signup-input" 
                    value={input.password} onChange={handleInput} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className="signup-input" 
                    value={input.confirmPassword} onChange={handleInput} />
                    <button type="submit" className="signup-button"
                    onClick={handleSubmit}>Sign Up</button>
                </form>
                <p className="signup-text">
                    Already have an account? <Link to="/userlogin" className="signup-link">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
