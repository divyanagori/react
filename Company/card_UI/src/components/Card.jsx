import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Card = (props) => {

  const navigate = useNavigate();

  // EDIT MODE

  const [isEditing, setIsEditing] = useState(false);

  // STATES

  const [name, setName] = useState(props.name);
  const [jobTitle, setJobTitle] = useState(props.jobTitle);
  const [empId, setEmpId] = useState(props.empId);
  const [position, setPosition] = useState(props.position);
  const [time, setTime] = useState(props.time);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const [joiningDate, setJoiningDate] = useState(props.joiningDate);



  // CANCEL EDITS

  function cancelEdits() {

    setName(props.name);
    setJobTitle(props.jobTitle);
    setEmpId(props.empId);
    setPosition(props.position);
    setTime(props.time);
    setEmail(props.email);
    setPhone(props.phone);
    setJoiningDate(props.joiningDate);

    setIsEditing(false);
  }



  // SAVE UPDATE

  function saveUpdate() {

    const updatedEmployee = {
      id: props.id,
      image: props.image,

      empId,
      name,
      jobTitle,
      position,
      time,
      email,
      phone,
      joiningDate,
    };

    props.updateEmployee(updatedEmployee);

    setIsEditing(false);
  }



  return (
    <div>

      <div className="card">

        <div className="cardItem">

          {/* TOP */}

          <div className="card_nav">

            <div
              className="active status"
              style={{ display: "flex" }}
            >
              <p
                style={{
                  marginRight: "2px",
                  marginTop: "3px",
                }}
              >
                <GoDotFill />
              </p>

              <p style={{ fontWeight: "450" }}>
                Active
              </p>
            </div>



            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              {/* EDIT BUTTON */}

              <button
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {

                  if (isEditing === false) {
                    setIsEditing(true);
                  }

                }}
              >
                <FaEdit />
              </button>



              {/* DELETE BUTTON */}

              <button
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  props.deleteEmployee(props.id)
                }
              >
                <MdOutlineCancel />
              </button>

            </div>

          </div>



          {/* HEADER */}

          <div className="header">

            <div className="card_image">
              <img
                className="image"
                src={props.image}
                alt=""
              />
            </div>



            <div className="userInfo">

              {/* NAME */}

              <div className="name">

                {isEditing ? (

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                ) : (

                  <h3>{name}</h3>

                )}

              </div>



              {/* JOB TITLE */}

              <div className="job">

                {isEditing ? (

                  <input
                    value={jobTitle}
                    onChange={(e) =>
                      setJobTitle(e.target.value)
                    }
                  />

                ) : (

                  <p>{jobTitle}</p>

                )}

              </div>

            </div>

          </div>



          {/* BODY */}

          <div className="body">

            {/* EMP ID */}

            <div
              className="emp_id"
              style={{ display: "flex" }}
            >

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



              {isEditing ? (

                <input
                  value={empId}
                  onChange={(e) =>
                    setEmpId(e.target.value)
                  }
                />

              ) : (

                <p>{empId}</p>

              )}

            </div>



            {/* POSITION + TIME */}

            <div className="detail">

              <div className="manager">

                {isEditing ? (

                  <input
                    value={position}
                    onChange={(e) =>
                      setPosition(e.target.value)
                    }
                  />

                ) : (

                  <p>{position}</p>

                )}

              </div>



              <div className="fulltime">

                {isEditing ? (

                  <input
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                  />

                ) : (

                  <p>{time}</p>

                )}

              </div>

            </div>



            {/* EMAIL + PHONE */}

            <div className="mail">

              <div className="mail_id">

                {isEditing ? (

                  <input
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                ) : (

                  <a
                    href={`mailto:${email}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <p>{email}</p>
                  </a>

                )}

              </div>



              <div className="number">

                {isEditing ? (

                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                  />

                ) : (

                  <a
                    href={`tel:${phone}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <p>{phone}</p>
                  </a>

                )}

              </div>

            </div>

          </div>



          {/* FOOTER */}

          <div className="footer">

            <div
              className="join_date"
              style={{
                display: "flex",
                alignItems: "center",
                height:"10px",
                marginRight:"3px"
              }}
            >

              <p
                style={{
                  marginRight: "3px",
                  color: "gray",
                }}
              >
                Joined at
              </p>


              {isEditing ? (

                <input
                  value={joiningDate}
                  onChange={(e) =>
                    setJoiningDate(e.target.value)
                  }
                />

              ) : (

                <p>{joiningDate}</p>

              )}

            </div>



            {isEditing ? (

              <div
                style={{
                  display: "flex",
                  gap: "7px",
                  height:"10px"
                }}
              >

                {/* SAVE BUTTON */}

                <button
                  className="view"
                  style={{
                    border: "none",
                    marginTop: "2px",
                  }}
                  onClick={saveUpdate}
                >
                  Save
                </button>



                {/* CANCEL BUTTON */}

                <button
                  className="view"
                  style={{
                    border: "none",
                    marginTop: "2px",
                  }}
                  onClick={cancelEdits}
                >
                  Cancel
                </button>

              </div>

            ) : (

              <button
                className="view"
                style={{
                  border: "none",
                 
                }}
                onClick={() =>
                  navigate(`/employe/${props.id}`)
                }
              >

                <div className="view_details">

                  <p
                    style={{
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    View Details
                  </p>

                </div>



                <p
                  style={{
                    border: "none",
                    marginTop: "2px",
                  }}
                >
                  <LiaGreaterThanSolid />
                </p>

              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Card;