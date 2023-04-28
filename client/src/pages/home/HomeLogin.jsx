
import "../login/login.css"
import Image1 from "./img/homeImage.jpg"
import Image2 from "./img/aboutUs.jpg"
import address from "./img/location.jpg"
import inquiry from "./img/email.jpg"
import call from "./img/Call.jpg"
import timings from "./img/clock.jpg"
import React from 'react'
import { Link } from 'react-router-dom'
import "./HomeLogin.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home2 =()=>{

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [number,setNumber]=useState()
    const [message,setMessage]=useState("")
    var [IsLogin,setIsLogin] = useState(0)

    const HandleSubmit=()=>{
        let arr1=[name,email,number,message]   //You can use it to Push to backend
        if (name==="" || email==="" || number===undefined || message===""){
            alert("Please fill all details!!")
        }else{
            const message1="Your Details are , Name: " + name + 
            " , Email: " + email + " , Your Contact Number " + number + " , Message: " + message +    // From here Contact data should be received and be analyzed by admin account. in backend
             " !!!Thanks for your Interest @!!! We will reach you ASAP , Be Connected with us...";
            alert(message1)
        }
                            
    }

    const HandleIsLogin=()=>{
        IsLogin=IsLogin+1;
        setIsLogin(IsLogin)
    }
    const HandleIscancel=()=>{
        IsLogin=IsLogin-1;
        setIsLogin(IsLogin)
    }

    const HandleLogin=()=>{

        var [userValue, setUserValue] = useState("");
       

    const navigate = useNavigate();
    var formData = {}

    function handleUser(e) {
        setUserValue(e.target.value);
    }

    console.log("uservalue : ", userValue)

    async function getFormData(e) {
        var flag = true;
        e.preventDefault();
        console.log("in the function ", userValue, flag)

        if (userValue === "Employee") {

            await fetch("/auth/logemp", {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify({
                    "email": e.target.email.value,
                    "password": e.target.password.value
                })
            }).then(result => {
                // console.log("result : " ,result)

                if (result.status != 200) {
                    alert("email or password not correct!")
                    flag = false;
                    console.log(flag)
                }
                return result.json();

            }).then(res => {
                // console.log("my res : ",res)
                if (flag === true) {
                    alert("Logged In Successfully!")
                    sessionStorage.setItem("userValue", "Employee")
                    sessionStorage.setItem("username", res.username)
                    sessionStorage.setItem("age", res.age)
                    sessionStorage.setItem("phone", res.phone)
                    sessionStorage.setItem("address", res.address)
                    sessionStorage.setItem("gender", res.gender)
                    sessionStorage.setItem("email", res.email)
                    sessionStorage.setItem("password", res.password)

                    navigate('/home', {
                    });
                }


            })
        }
        else if (userValue === "Company") {
            await fetch("/auth/logcom", {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify({
                    "email": e.target.email.value,
                    "password": e.target.password.value
                })
            }).then(result => {
                // console.log("result : " ,result)

                if (result.status != 200) {
                    alert("email or password not correct!")
                    flag = false;
                    console.log(flag)
                }
                return result.json();

            }).then(res => {
                // console.log("my res : ",res)
                if (flag === true) {
                    alert("Logged In Successfully!")
                    sessionStorage.setItem("userValue", "Company")
                    sessionStorage.setItem("username", res.username)
                    sessionStorage.setItem("phone", res.phone)
                    sessionStorage.setItem("CIN_No", res.CIN_No)
                    sessionStorage.setItem("desc", res.desc)
                    sessionStorage.setItem("address", res.address)
                    sessionStorage.setItem("work", JSON.stringify(res.work))
                    sessionStorage.setItem("email", res.email)
                    sessionStorage.setItem("password", res.password)

                    navigate('/home', {
                    });
                }


            })
        }
    }
    if (IsLogin===0){
        return(
            <div></div>
        )
    }
    else{

    return (

        <div className='body'>
            <div className='heading'>
                
            </div>
            <div className='login-div'>
                <div id="form-header">
                    <span>Login</span>
                </div><br />
                <form method='POST' onSubmit={getFormData}>
                    {/* <label htmlFor="" className='form-ele'>User Nature : </label><br /><br /> */}
                    <select onChange={handleUser} required>
                        <option value="">User Nature</option>
                        <option value="Employee">Employee</option>
                        <option value="Company">Company</option>
                    </select><br /><br />
                    <label htmlFor="" className='form-ele'>Email Id</label><br /><br />
                    <input type="email" name="email" className='login-input' required /><br /><br />
                    <label htmlFor="" className='form-ele'>Password</label><br /><br />
                    <input type="password" name="password" className='login-input' required /><br /><br />
                    <button type="submit" id="submit-btn">Login</button><br /><br />
                    <div className="LoginLinks">
                    <a  id="AccountLinks" href="/signup">Don't have an account ?</a>
                    <Link onClick={()=>{HandleIscancel()}} href="/signup" id="CancelLink">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )

    }
}

    return(
        
        <div className="main">
        <div className="navbar">
                <div className="navContainer">
    
                    {/* <span className="logo">Eventoe</span> */}
                    <ul className='homeul'>
                        {/* <li><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/profile" state={{ type, userDetail }}>Profile</Link></li> */}
                        <li id='homeli' ><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/" >Eventoe</Link></li>
                        <li id='homeli' ><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/" ></Link></li>
                        
                    </ul>
                    <div className="endL" >
                        <li><Link    id="logout2"  to="/signup">SignUp</Link></li>
                        <li className="li" onClick={()=>{HandleIsLogin()}} ><Link    id="logout2">Login</Link></li>
                    </div>
                </div>
            </div>
        <div className="Login">
        <HandleLogin/>
        </div>
        <div className="image">
        
            <img src={Image1} />
            </div>
        <div className="aboutUs">
            <div className="text"> <div id="heading"><h1>About Us</h1></div>
            <div id="heading2"><p>Bringing Imaginations into Reality</p></div> 
              <div id="bodytext"><p>Eventoe is a website which is based on building an interface website for the company's which organize different types of events and unemployed youth.
    There are many types of events like wedding , fashion show , award ceremony, product launch , concert etc. And also many types of works like planner , caterers, decorator , photographer , labour , designer & etc.
    Providing security and protection to your personal Information/detail is one of the main concern of this website(Eventoe).
    This website is mainly helpful for providing short time work to the youth of our country, so that they can gain some pocket money for themselves.
    Eventoe takes this responsibility of providing only verified companies jobs to the users.
    Each company registered with Eventoe would have a valid - Corporate Identification Number.</p></div>
            </div>
            <div className="photo">
            <img src={Image2} />
            </div>
        </div>
        <div className="contactUs">
            
            <div className="headContact">Contact Us</div>
            <div className="bodyContact">
                <div className="detailContact">
                    <div className="detailContactIn">
                        <img src={address}/>
                        <div className="detailContactInText"> <h1>Our Office Address</h1><br/>
                        <p>.
                            Noida Sector 82 near NSEZ Phase II Uttar Pradesh
                                </p>
                        </div>

                    </div>
                    <div className="detailContactIn">
                    <img src={inquiry}/>
                    <div className="detailContactInText"><h1>General Enquiries</h1><br/>

                        <p>
                        eventoeHelp@ev.in
                        </p>
                        </div>
                    </div>
                    <div className="detailContactIn">
                    <img src={call}/>
                    <div className="detailContactInText"><h1>Call Us</h1><br/>
                        <p>+91-960219****<br/>
+91-960219****<br/>
0291-294****
</p>
                        </div>
                    </div>
                    <div className="detailContactIn">
                    <img src={timings}/>
                    <div className="detailContactInText"><h1>Our Timing</h1><br/>
                        <p>Mon - Sun : 09:00 AM - 09:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className="formContact">
                    <b><label>Your Name</label></b><br/>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} ></input><br/>
                    <b><label>Your Email</label></b><br/>
                    <input type="text" value={email}  onChange={(e)=>{setEmail(e.target.value)}} ></input><br/>
                    <b><label>Contact Number</label></b><br/>
                    <input type="text" value={number} onChange={(e)=>{setNumber(e.target.value)}} ></input><br/>
                    <b><label>Message</label></b><br/>
                    <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} ></input><br/>
                    <button onClick={()=>{HandleSubmit()}}> Submit</button>
                </div>
            </div>
        
        </div>
        </div>
    )
}

export default Home2;