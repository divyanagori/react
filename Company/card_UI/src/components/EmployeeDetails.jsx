import React from "react";
import {useParams} from "react-router-dom";
import { GoDotFill } from "react-icons/go";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

const EmployeeDetails = () => {
   const {empId} = useParams();
   const jobOpenings = JSON.parse(localStorage.getItem("emp")) || []; 
   const emp = jobOpenings.find(
  (emp) => emp.id === Number(empId)
);
   
  return (
    <div>
      <div className="card">
        <div className="cardItem">
          <div className="card_nav">
            <div className="active status" style={{ display: "flex" }}>
              <p style={{ marginRight: "2px", marginTop: "3px" }}>
                <GoDotFill />
              </p>
              <p style={{ fontWeight: "450" }}>Active</p>
            </div>
            <div className="option">
              <p>
                <HiOutlineDotsHorizontal />
              </p>
            </div>
          </div>

          <div className="header">
            <div className="card_image">
              <img className="image" src={emp.image} alt="" />
            </div>
            <div className="userInfo">
              <div className="name">
                <h3>{emp.name}</h3>
              </div>
              <div className="job">
                <p>{emp.jobTitle}</p>
              </div>
            </div>
          </div>
          <div className="body">  
            <div className="emp_id" style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  color: "rgba(164, 135, 135, 0.863)",
                  fontSize: "17px",
                  marginRight: "5px",
                }}
              >
                #
              </p>
              <p> {emp.empId}</p>
            </div>
            <div className="detail">
              <div className="manager">
                <p>{emp.position}</p>
              </div>
              <div className="fulltime">
                <p>{emp.time}</p>
              </div>
            </div>
            <div className="mail">
              <div className="mail_id">
               <a href={`mailto:${emp.email}`} style={{textDecoration:"none", color:"black"}}>
                 <p>{emp.email}</p>
               </a>
              </div>
              <div className="number" >
                <a href={`tel:${emp.phone} `} style={{textDecoration:"none" , color:"black"}}>
                  <p>{emp.phone}</p>
                </a>

              </div>
            </div>
          </div>
          <div className="footer">
            <div
              className="join_date"
              style={{ display: "flex", alignItems: "center" }}
            >
              <p style={{ marginRight: "4px", color: "gray" }}>Joined at </p>
              <p> {emp.joiningDate}</p>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
