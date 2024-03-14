import React, { useEffect, useState } from "react";
import "./Edit.css";
import axios from "axios";
import { baseUrl } from "../../config/BaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
function Editprofile() {
  const { id } = useParams();
  // const userId = parseInt(id);
  const { enqueueSnackbar } = useSnackbar();

  const navigate=useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [goal, setGoal] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [profile, setProfile] = useState("");
  
  useEffect(() => {
    getUser();
    console.log(goal);
  }, []);
  const getUser = async () => {
    
    try {
      axios
        .get(
          `${baseUrl}/profile/${id}`
          // , {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //     Authorization: "Bearer " + token,
          //   },
          // }
        )
        .then((response) => {
          setName(response.data.name);
          setEmail(response.data.email);
          setNumber(response.data.number);
          setGoal(response.data.goals);
          setHeight(response.data.height);
          setWeight(response.data.weight);
          setProfile(response.data.profile);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const data = new FormData();
  data.append("name", name);
  data.append("email", email);
  data.append("number", number);
  data.append("goal", goal);
  data.append("height", height);
  data.append("weight", weight);
  data.append("profile", profile[0]);
  const handleEdit=async(e)=>{
    e.preventDefault();
    try {
      axios.put(`${baseUrl}/edituser/${id}`,data // , {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: "Bearer " + token,
        //   },    
        // }
        ).then((response)=>{
          console.log('edited successful');
          navigate(-1)
          enqueueSnackbar("Edit successful", {
            variant: "success",
          });
          
        })
    } catch (error) {
      console.log(error);
      enqueueSnackbar("something wrong", { variant: "error" });

    }
  }
  return (
    <div className="profile-edit-container">
      <h1>Edit Profile</h1>
      <form action="" onSubmit={(e)=>handleEdit(e)}>
        <div className="profile-edit-inputs">
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
            title="Please enter a correct email"
          />
        </div>

        <div className="profile-edit-inputs">
          <label htmlFor="">Mobile Number</label>
          <input
            type="number"
            value={number}
            pattern="[0-9]{10}"
            title="Please enter a 10-digit mobile number"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Profile Picture </label>
          <input
            type="file"
            id="input-file"
            onChange={(e) => setProfile(e.target.files)}
            name="profile"
            accept="image/png, image/jpeg"
          />{" "}
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="goals">Goals</label>
          <select
            id="goals"
            name="goals"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">Select Goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="general-fitness">General Fitness</option>
          </select>
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Weight (KG)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Height (CM)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}

export default Editprofile;
