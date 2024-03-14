import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/BaseUrl";
import { DataContext } from "../../context/Datacontext";
function Profile() {
  const { userId } = useContext(DataContext);
  const [userData, setUserData] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      axios
        .get(
          `${baseUrl}/profile/${userId}`
          // , {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //     Authorization: "Bearer " + token,
          //   },
          // }
        )
        .then((response) => {
          console.log(response.data);
          setUserData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="profile-section">
      <div className="left-section ">
        <img src={`${baseUrl}/${userData.profile}`} alt="" />
        <h4>{userData.name}</h4>
        <p>{userData.email}</p>
        <Link to="/logout">
          <Button variant="danger">Logout</Button>
        </Link>
      </div>
      <div className="profile-body">
        <h1>Profile Settings</h1>
        <div className="profile-items">
          <div className="profile-inputs">
            <label htmlFor="">Name</label>
            <input type="name" value={userData.name} readOnly />
          </div>
          <div className="profile-inputs">
            <label htmlFor="">Email</label>
            <input type="text" value={userData.email} readOnly />
          </div>
          <div className="profile-inputs">
            <label htmlFor="">Mobile Number</label>
            <input type="text" value={userData.number} readOnly />
          </div>
          {userData.goals ? (
            <>
            <div className="profile-inputs">
              <label htmlFor="">Goals</label>
              <input type="text" value={userData.goals} readOnly />
            </div>
            <div className="profile-inputs">
              <label htmlFor="">Height</label>
              <input type="text" value={`${userData.height} CM`} readOnly />
            </div>
            <div className="profile-inputs">
              <label htmlFor="">Weight</label>
              <input type="text" value={`${userData.weight} KG`}  readOnly />
            </div>
            

            </>
          ) : (
            <div></div>
          )}

          <button type="submit" onClick={() => nav(`/editprofile/${userData._id}`)}>
            Edit
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
