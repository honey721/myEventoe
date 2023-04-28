// lines edited - 231 , 236, 239, 242 
// lines commented - 38, 40,  41

import React, { useEffect, useState } from 'react'
import "./profile.css"
import { Navigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

function Profile() {
    var [showDeleteBtn, setShowDeleteBtn] = useState(false);
    var [addJob, setAddJob] = useState(false);
    var [workValue, setWorkValue] = useState(false);
    var [showInputBox, setShowInputBox] = useState(false);
    var [flag, setFlag] = useState(false);
    var [showNewJobDetail, setShowNewJobDetail] = useState(false);
    var [inputWorkName, setInputWorkName] = useState("");
    var [deleteBtnText, setDeleteBtnText] = useState("delete");


    var [f1, setf1] = useState(false);
    var [f2, setf2] = useState(false);
    var [f3, setf3] = useState(false);
    var [f4, setf4] = useState(false);

    var [jobsIndices, setJobsIndices] = useState([]);

    var [days, setDays] = useState(0);
    var [startDate, setstartDate] = useState();
    var [endDate, setendDate] = useState();
    var [amountPaid, setAmountPaid] = useState(0);


    // var [userDetail, setUserDetail] = useState({});


    var location = useLocation();
    // var userDetail = location.state.userDetail;
    // var userType = location.state.type;
    var jobs = [];
    // jobs = userDetail.work;

    jobs = JSON.parse(sessionStorage.getItem("work"));


    const workOptions = [
        {
            label: "select work",
            value: "select work"
        },
        {
            label: "labour",
            value: "labour"
        },
        {
            label: "photographer",
            value: "photographer",
        },
        {
            label: "decorator",
            value: "decorator",
        },

        {
            label: "designer",
            value: "designer"
        },
        {
            label: "loading worker",
            value: "loading worker"
        },
        {
            label: "groomer",
            value: "groomer"
        },
        {
            label: "planner",
            value: "planner"
        },
        {
            label: "caterers",
            value: "caterers"
        },
        {
            label: "light technician",
            value: "light technician"
        },
        {
            label: "choreographer",
            value: "choreographer"
        },
        {
            label: "video editor",
            value: "video editor"
        },
        {
            label: "video editor",
            value: "video editor"
        },
        {
            label: "accounting",
            value: "accounting"
        },
        {
            label: "other",
            value: "other"
        },
    ];


    async function updateArticle() {
        await fetch("/article/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "jobs": JSON.parse(sessionStorage.getItem("work")),
                "email": sessionStorage.getItem("email")
            })
        }).then(async result => {
            if (result.ok) {
                // calling update api of company model.
                await fetch("/auth/update", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "work": JSON.parse(sessionStorage.getItem("work")),
                        "email": sessionStorage.getItem("email")
                    })
                }).then(result => {
                    if (result.ok) {
                        return result.json();
                    }
                    throw new Error('Something went wrong');

                }).then(res => {
                    console.log("res : ", res);
                })


                return result.json();
            }
            throw new Error('Something went wrong');

        }).then(res => {
            console.log("res : ", res);
        })
    }


    function handleDeleteBtn() {

        if (deleteBtnText === "delete") {
            setDeleteBtnText("delete selected jobs");
            setShowDeleteBtn(true);
        }
        else if (deleteBtnText === "delete selected jobs") {
            setDeleteBtnText("delete");
            setShowDeleteBtn(false);
            setAddJob(false)

            jobsIndices.sort();
            jobsIndices.reverse();

            for (let ind of jobsIndices) {
                for (let i = jobs.length - 1; i >= 0; i--) {
                    if (i === ind && jobs.length > 1) {

                        jobs.splice(i, 1);
                        console.log("job: ", jobs, ind, i)
                        break;
                    }
                }

            }

            setJobsIndices([])
            console.log("jobs : ", jobs)
            sessionStorage.setItem("work", JSON.stringify(jobs))
            updateArticle();
        }

    }
    var d = new Date();
    function handleUpdate() {

        var jobName = workValue;
        if (workValue === "other") {
            jobName = inputWorkName;
        }
        if ((startDate[8] + startDate[9] <= endDate[8] + endDate[9] && startDate[5] + startDate[6] == endDate[5] + endDate[6]) || startDate[5] + startDate[6] < endDate[5] + endDate[6]) {

            var diff = Math.abs(new Date(startDate) - new Date(endDate))
            var dayDiff = diff / (1000 * 3600 * 24)

            if (Number(startDate[8] + startDate[9]) < d.getDate() || dayDiff != days) {

                alert("Invalid! startDate / select correct no. of days.")
            }
            else {

                jobs.push({ workName: jobName, days: days, startDate: startDate, endDate: endDate, amountPaid: amountPaid});
                console.log(jobs);
                sessionStorage.setItem("work", JSON.stringify(jobs))
                // 
                setWorkValue("select work");
                setShowNewJobDetail(false);
                setShowInputBox(false);
                setFlag(false);
                setAddJob(false);
                updateArticle();
            }

        }
        else {
            alert("please select valid Dates");
        }

    }
    console.log(jobsIndices);

    function handleChangeWork(e) {
        setInputWorkName("");
        setWorkValue(e.target.value);
        if (e.target.value === "select work") {
            setShowNewJobDetail(false);
            setShowInputBox(false);
        }
        else if (e.target.value === "other") {
            setShowInputBox(true);
            setShowNewJobDetail(false);
        }
        else {
            setShowInputBox(false);
            setShowNewJobDetail(true);
        }
    }

    if (f1 === true && f2 === true && f3 === true && f4 === true) {
        setFlag(true);
        setf1(false);
        setf2(false);
        setf3(false);
        setf4(false);
    }


    return (

        <div>
            <Navbar />
            {sessionStorage.getItem("userValue") === "Employee" && <div className="emp">
                {/* <span id='profile'>Hello! {userDetail.username}</span> */}
                <span id='profile'>Hello! {sessionStorage.getItem("username")}</span>
                <span id='profileSpan2' >Below is your personal detail</span>
                <hr />
                <form action="" id='comform'>
                    <br />
                    <label htmlFor="">Username</label>
                    {/* <input type="text" name="" value={userDetail.username} id="" /><br /><br /><br /><br /> */}
                    <input type="text" name="" value={sessionStorage.getItem("username")} id="" /><br /><br /><br /><br />

                    <label htmlFor="">Age</label>
                    {/* <input type="text" name="" value={userDetail.age} id="" /><br /><br /><br /><br /> */}
                    <input type="text" name="" value={sessionStorage.getItem("age")} id="" /><br /><br /><br /><br />

                    <label htmlFor="">Mobile No.</label>
                    {/* <input type="text" name="" value={userDetail.phone} id="" /><br /><br /><br /><br /> */}
                    <input type="text" name="" value={sessionStorage.getItem("phone")} id="" /><br /><br /><br /><br />

                    <label htmlFor="">Address</label>
                    {/* <input type="text" name="" value={userDetail.address} id="" /><br /><br /><br /><br /> */}
                    <input type="text" name="" value={sessionStorage.getItem("address")} id="" /><br /><br /><br /><br />

                    <label htmlFor="">Registered Email Id</label>
                    {/* <input type="text" name="" value={userDetail.email} id="" /><br /><br /><br /><br /> */}
                    <input type="text" name="" value={sessionStorage.getItem("email")} id="" /><br /><br /><br /><br />

                    <label htmlFor="">Gender</label>
                    {/* <input type="text" name="" value={userDetail.gender} id="" /><br /><br /><br /><br /> */}
                    <input type="text" name="" value={sessionStorage.getItem("gender")} id="" /><br /><br /><br /><br />

                    <Link id='updateBtn' to="/Update" type="button">Update</Link>
                </form>
            </div>}
            {sessionStorage.getItem("userValue") === "Company" && <div className="com">

                <span id='profile'>Hello! {sessionStorage.getItem("username")}</span>
                <span id='Span2' >Below is your personal detail</span>
                <hr />
                <div className="mainbody">
                    <form action="" id='comform'>
                        <br />
                        <label  htmlFor="">Organization Name</label>
                        <input type="text" name="" value={sessionStorage.getItem("username")} id="" /><br /><br /><br /><br />

                        <label htmlFor="">CIN No.</label>
                        <input type="text" name="" value={sessionStorage.getItem("CIN_No")} id="" /><br /><br /><br /><br />

                        <label htmlFor="">Contact No.</label>
                        {/* <input type="text" name="" value={userDetail.phone} id="" /><br /><br /><br /><br /> */}
                        <input type="text" name="" value={sessionStorage.getItem("phone")} id="" /><br /><br /><br /><br />

                        <label htmlFor="">Address</label>
                        {/* <input type="text" name="" value={userDetail.address} id="" /><br /><br /><br /><br /> */}
                        <input type="text" name="" value={sessionStorage.getItem("address")} id="" /><br /><br /><br /><br />

                        <label htmlFor="">Registered Email Id</label>
                        {/* <input type="text" name="" value={userDetail.email} id="" /><br /><br /><br /><br /> */}
                        <input type="text" name="" value={sessionStorage.getItem("email")} id="" /><br /><br /><br /><br />
                        <div className="descDiv">
                            <label id='desc' htmlFor="">Description</label>
                            {/* <textarea value={userDetail.desc} name="desc" id="" cols="57" rows="10" ></textarea><br /><br /><br /><br /> */}
                            <textarea value={sessionStorage.getItem("desc")} name="desc" id="" cols="60" rows="5" ></textarea><br /><br /><br /><br />
                        </div>
                        <br /><br />            
                               <Link id='updateBtn' to="/Update" type="button">Update</Link>
 
                    </form>

                    <div className="jobsSection">

                        <label htmlFor="">Jobs posted by you : </label><br /><br />
                        {JSON.parse(sessionStorage.getItem("work")).map((job, index) => (
                            <div className="outerJobSection">
                                <div className="jobSection">
                                    <label>{job.workName} : </label><br /><br />
                                    <div className="otherDiv">
                                        <div className="daySection">
                                            <label htmlFor="">For how many days </label><br />
                                            <input type="text" value={job.days} name="" id="" />
                                        </div>
                                        <div className="startDateSection">
                                            <label htmlFor="">Start Date </label><br />
                                            <input type="text" value={job.startDate} name="" id="" />
                                        </div>
                                        <div className="endDateSection">
                                            <label htmlFor="">End Date </label><br />
                                            <input type="text" value={job.endDate} name="" id="" />
                                        </div>
                                        <div className="amountPaidSection">
                                            <label htmlFor="">Employee Paid By </label><br />
                                            <input type="text" value={job.amountPaid} name="" id="" /><br /><br />
                                        </div>
                                    </div>
                                </div>
                                {showDeleteBtn &&
                                    <div className="checkboxSection">
                                        <input type="checkbox" name="" id={index} onChange={(e) => {
                                            if (jobsIndices.indexOf(parseInt(e.target.id)) === -1) {
                                                setJobsIndices(jobsIndices => [...jobsIndices, parseInt(e.target.id)]);
                                            }
                                            else {
                                                setJobsIndices((current) => current.filter((element) => element !== parseInt(e.target.id)));
                                            }

                                        }} />
                                    </div>}
                            </div>
                        ))}

                        {addJob === true &&
                            <div className="jobSection">
                                <div className="upperJobSection">
                                    <select name='work' value={workValue} onChange={handleChangeWork}>
                                        {workOptions.map((option) => (
                                            <option value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                    <br /><br />
                                    {showInputBox && <div className='inputWork'>
                                        <label htmlFor="">Enter the job/work name </label>
                                        <input type="text" name="" id="" value={inputWorkName} onChange={(e) => {
                                            setInputWorkName(e.target.value);
                                            setShowNewJobDetail(true);
                                        }} />
                                        <br /> <br />
                                    </div>
                                    }

                                </div>
                                {showNewJobDetail &&
                                    <div className="lowerJobSection">
                                        <div className="dayDiv">
                                            <label htmlFor="">For how many days </label><br />
                                            <input type="number" name="" id="" onChange={(e) => {
                                                setDays(e.target.value)
                                                setf1(true);
                                            }} /><br /><br />
                                        </div>
                                        <div className="startDateDiv">
                                            <label htmlFor="">Start Date </label><br />
                                            <input type="date" name="" id="" onChange={(e) => {
                                                setstartDate(e.target.value)
                                                setf2(true);
                                            }} /><br /><br />
                                        </div>
                                        <div className="endDateDiv">
                                            <label htmlFor="">End Date </label><br />
                                            <input type="date" name="" id="" onChange={(e) => {
                                                setendDate(e.target.value)
                                                setf3(true);
                                            }} /><br /><br />
                                        </div>
                                        <div className="amountPaidDiv">
                                            <label htmlFor="">Employee Paid By </label><br />
                                            <input type="number" name="" id="" onChange={(e) => {
                                                setAmountPaid(e.target.value)
                                                setf4(true);
                                            }} /><br /><br />
                                            <button id='addButton' disabled={!flag} type="button" onClick={handleUpdate}>Add</button>

                                        </div>
                                    </div>
                                }

                            </div>
                        }
                        {addJob === false &&
                            <div className="btns">
                                {!showDeleteBtn && <button type='button' id='addBtn' onClick={() => {
                                    setAddJob(true)
                                }}>Add a job</button>}
                                <button id='deleteBtn' type='button' onClick={handleDeleteBtn}>{deleteBtnText}</button>
                            </div>
                        }

                    </div>
                </div>

            </div>}

        </div>
    )
}

export default Profile
