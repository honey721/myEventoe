import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar'
import "./login.css"

function Login() {

    var [userValue, setUserValue] = useState("");

    const navigate = useNavigate();
    var formData = {}

    function handleUser(e) {
        sessionStorage.setItem("userValue",e.target.value)
    }

    console.log("uservalue : ", userValue)

    async function getFormData(e) {
        var flag = true;
        e.preventDefault();
        console.log("in the function ", userValue, flag)

        if (sessionStorage.getItem("userValue") === "Employee") {

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
                console.log("my res : ", res)
                if (flag === true) {
                    alert("Logged In Successfully!")

                    navigate('/home'
                    // ,{
                    //     state: {
                    //         formData: res, 
                    //         userValue
                    //     }
                    // }
                    );

                    sessionStorage.setItem("username", res.username)
                    sessionStorage.setItem("age", res.age)
                    sessionStorage.setItem("phone", res.phone)
                    sessionStorage.setItem("address", res.address)
                    sessionStorage.setItem("gender", res.gender)
                    sessionStorage.setItem("email", res.email)
                    sessionStorage.setItem("password", res.password)
                }


            })
        }
        else if (sessionStorage.getItem("userValue") === "Company") {
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
                console.log("my res : ",res)
                if (flag === true) {
                    alert("Logged In Successfully!")

                    navigate('/home'
                    // , {
                    //     state: {
                    //         formData: res,
                    //          userValue
                    //     }
                    // }
                    );

                    sessionStorage.setItem("username", res.username)
                    sessionStorage.setItem("phone", res.phone)
                    sessionStorage.setItem("CIN_No", res.CIN_No)
                    sessionStorage.setItem("desc", res.desc)
                    sessionStorage.setItem("address", res.address)
                    sessionStorage.setItem("work", JSON.stringify(res.work))
                    sessionStorage.setItem("email", res.email)
                    sessionStorage.setItem("password", res.password)
                }


            })
        }
    }


    return (

        <div className='body'>
            <div className='heading'>
                <h1 className='name'>Eventoe</h1>
            </div>
            <div className='login-div'>
                <div id="form-header">
                    <span>Login Page</span>
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
                    <a href="/signup">Don't have an account ?</a>
                </form>
            </div>
        </div>
    )
}

export default Login
