import { useState } from "react"
import "../../components/footer/footer.css"
import "./ProfileUpdate.css"
import Navbar from "../../components/navbar/Navbar"
import { Navigate, useNavigate } from "react-router-dom";

export default function Update() {
    const navigate = useNavigate();
    const [username,SetUsername]=useState(sessionStorage.getItem("username"));
    const [age,Setage]=useState(sessionStorage.getItem("age"));
    const [phone,SetPhone]=useState(sessionStorage.getItem("phone"));
    const [address,SetAddress]=useState(sessionStorage.getItem("address"));
    const [email,SetEmail]=useState(sessionStorage.getItem("email"));
    const [gender,Setgender]=useState(sessionStorage.getItem("gender"));
    const [state,Setstate]=useState("0")


    const [CIN_No,SetCin]=useState(sessionStorage.getItem("CIN_No"));
    const [desc,SetDesc]=useState(sessionStorage.getItem("desc"));
    

    const HandleSave=()=>{
        if(sessionStorage.getItem("userValue")==="Employee"){
            sessionStorage.setItem("username",username);
            sessionStorage.setItem("age",age);
            sessionStorage.setItem("phone",phone);
            sessionStorage.setItem("address",address);
            sessionStorage.setItem("email",email);
            sessionStorage.setItem("gender",gender);

       
        }
        else{
            sessionStorage.setItem("username",username);
            sessionStorage.setItem("CIN_No",CIN_No);
            sessionStorage.setItem("phone",phone);
            sessionStorage.setItem("address",address)
            sessionStorage.setItem("email",email);
            sessionStorage.setItem("desc",desc);
        }
        //API for Update
        navigate("/profile")
        
    }
    const HandleCancel=()=>{
        navigate("/profile")
    }

    if(sessionStorage.getItem("userValue")==="Employee"){
        return(
            <div className="Main">
            <Navbar/>
            <div className="main2">
            <span id='profileSpan2' ><h2>Edit Your Details</h2></span>
                <hr />
            <div className="form">
                <div className="Names">
                        <div><label htmlFor="">Username</label><br/></div>
                        
                       <div> <label htmlFor="">Age</label><br/></div>
    
                        <div><label htmlFor="">Mobile No.</label><br/></div>
    
                     <div>   <label htmlFor="">Address</label><br/></div>
    
                       <div> <label htmlFor="">Registered Email Id</label><br/></div>
    
                        <div><label htmlFor="">Gender</label><br/></div>
                </div>
                <div className="InputFields">
                        <input type="text" name="" value={username} onChange={(e)=>{SetUsername(e.target.value)}} id="" /><br/>
                        <input type="text" name="" value={age} onChange={(e)=>{Setage(e.target.value)}} id="" /><br/>
                        <input type="text" name="" value={phone} onChange={(e)=>{SetPhone(e.target.value)}} id="" /><br/>
                        <input type="text" name="" value={address} onChange={(e)=>{SetAddress(e.target.value)}} id="" /><br/>
                        <input type="text" name="" value={email} onChange={(e)=>{SetEmail(e.target.value)}} id="" /><br/>
                        <input type="text" name="" value={gender} onChange={(e)=>{Setgender(e.target.value)}} id="" /><br/>
                </div>
            
            </div>
            
            </div>
            <hr/>
            <button className="button" id="but1" onClick={()=>HandleSave()}>Save</button>
            <button className="button"id="butt2" onClick={()=> HandleCancel()}>Cancel</button>
            </div>
         
        )
    
    }
    else{
        return(
            <div className="Main">
            <Navbar/>
            <div className="main2">
            <span id='profileSpan2' ><h2>Edit Your Details</h2></span>
                <hr />
            <div className="form">
                <div className="Names">

                        <div><label htmlFor="">Organization Name</label><br/></div>

                        <div>  <label htmlFor="">CIN No.</label><br/></div>

                        <div> <label htmlFor="">Contact No.</label><br/></div>

                        <div> <label htmlFor="">Address</label><br/></div>

                        <div> <label htmlFor="">Registered Email Id</label><br/></div>

                        <div> <label id='desc' htmlFor="">Description</label><br/></div>
                       
                </div>
                <div className="InputFields">
                        <div><input type="text" name="" value={username} onChange={(e)=>{SetUsername(e.target.value)}} id="" /><br /></div>
                       <div> <input type="text" name="" value={CIN_No} onChange={(e)=>{SetCin(e.target.value)}} id="" /><br /></div>
                        <div><input type="text" name="" value={phone} onChange={(e)=>{SetPhone(e.target.value)}} id="" /><br /></div>
                        <div><input type="text" name="" value={address} onChange={(e)=>{SetAddress(e.target.value)}} id="" /><br /></div>
                        <div><input type="text" name="" value={email} onChange={(e)=>{SetEmail(e.target.value)}} id="" /><br /></div>
                        <div><textarea type="text" id="textarea" value={(desc)} onChange={(e)=>{(SetDesc(e.target.value))}} cols={57} name="desc"  ></textarea><br /></div>

                </div>
            
            </div>
            </div>
            <hr/>
            <button className="button" id="butt1"onClick={()=>HandleSave()}>Save</button>
            <button className="button" id="butt2" onClick={()=>HandleCancel()}>Cancel</button>
            </div>
         
        )   
        
    }


}


