// lines edited - 18, 20, 25
// lines commented - 11, 

import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

function Navbar(props) {
    // console.log("fgdf", props.name, props.userDetail)
    // var type = props.name;
    // var userDetail = props.userDetail;
    if(sessionStorage.getItem('email')){
        return (
            <div className="navbar">
                <div className="navContainer">
    
                    {/* <span className="logo">Eventoe</span> */}
                    <ul className='homeul'>
                        {/* <li><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/profile" state={{ type, userDetail }}>Profile</Link></li> */}
                        <li id='homeli' ><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/home" >Eventoe</Link></li>
                        <li><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/profile">Profile</Link></li>
                    </ul>
                    <div className='output'>
                        <Link id="logout" onClick={()=>{sessionStorage.clear() }} style={{ color: '#FFF', textDecoration: 'none' }} to="/" >Logout</Link>
                        
                    </div>
                </div>
            </div>
        )
    }
    else{
    return (
        <div className="navbar">
            <div className="navContainer">

                {/* <span className="logo">Eventoe</span> */}
                <ul className='homeul'>
                    {/* <li><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/profile" state={{ type, userDetail }}>Profile</Link></li> */}
                    <li id='homeli' ><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/" >Eventoe</Link></li>
                    <li><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/">Home</Link></li>
                </ul>
                <div className='login'>
                    <Link id="login" style={{ textDecoration: 'none' }} to="/" >Login</Link>
                    
                </div>
            </div>
        </div>
    )
    }
}

export default Navbar
