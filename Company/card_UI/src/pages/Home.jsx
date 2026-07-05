import React, { useState, useEffect } from "react";
import jobOpenings from "../data/employeeData.js";
import Card from "../components/Card.jsx";

const Home = () => {

  // Employee State

  const [employe, setEmploye] = useState(() => {

    const savedData = localStorage.getItem("emp");

    if (savedData) {
      return JSON.parse(savedData);
    }

    return jobOpenings;
  });






  // Input States

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [empId, setEmpId] = useState("");
  const [position, setPosition] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [joiningDate, setJoiningDate] = useState("");







  // ADD EMPLOYEE

  const addEmployee = () => {

    if (
      image.trim() === "" ||
      name.trim() === "" ||
      jobTitle.trim() === "" ||
      empId.trim() === "" ||
      position.trim() === "" ||
      time.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      joiningDate.trim() === ""
    ) {
      alert("Enter All Fields");
      return;
    }

    const newEmployee = {
      id: employe.length + 1,
      image,
      name,
      jobTitle,
      empId,
      position,
      time,
      email,
      phone,
      joiningDate,
    };

    setEmploye([...employe, newEmployee]);




    // Clear Inputs

    setImage("");
    setName("");
    setJobTitle("");
    setEmpId("");
    setPosition("");
    setTime("");
    setEmail("");
    setPhone("");
    setJoiningDate("");
  };







  // DELETE EMPLOYEE

  function deleteEmployee(id) {

    const updatedEmp = employe.filter(
      (emp) => emp.id !== id
    );

    setEmploye(updatedEmp);
  }







  // UPDATE EMPLOYEE

  function updateEmployee(updatedEmployee) {

    const updatedEmployees = employe.map((emp) =>

      emp.id === updatedEmployee.id
        ? updatedEmployee
        : emp
    );

    setEmploye(updatedEmployees);
  }


  // LOCAL STORAGE

  useEffect(() => {

    localStorage.setItem(
      "emp",
      JSON.stringify(employe)
    );

  }, [employe]);








  return (
    <>
    
      <div className="input_fild">

        <input
          value={image}
          placeholder="Image URL"
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <input
          value={name}
          placeholder="Name"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          value={jobTitle}
          placeholder="Job Title"
          onChange={(e) =>
            setJobTitle(e.target.value)
          }
        />

        <input
          value={empId}
          placeholder="Employee ID"
          onChange={(e) =>
            setEmpId(e.target.value)
          }
        />

        <input
          value={position}
          placeholder="Position"
          onChange={(e) =>
            setPosition(e.target.value)
          }
        />

        <input
          value={time}
          placeholder="Time"
          onChange={(e) =>
            setTime(e.target.value)
          }
        />

        <input
          value={email}
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          value={phone}
          placeholder="Phone"
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <input
          value={joiningDate}
          placeholder="Joining Date"
          onChange={(e) =>
            setJoiningDate(e.target.value)
          }
        />



        <button onClick={addEmployee}>
          Add Card
        </button>

      </div>








      <div className="cardbox">

        {employe.map((elem, idx) => (

          <div key={idx}>

            <Card
              id={elem.id}
              image={elem.image}
              name={elem.name}
              jobTitle={elem.jobTitle}
              empId={elem.empId}
              position={elem.position}
              time={elem.time}
              email={elem.email}
              phone={elem.phone}
              joiningDate={elem.joiningDate}
              deleteEmployee={deleteEmployee}
              updateEmployee={updateEmployee}
            />

          </div>
        ))}

      </div>
    </>
  );
};

export default Home;