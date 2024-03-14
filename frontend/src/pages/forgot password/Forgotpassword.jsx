import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/BaseUrl";
import axios from "axios";

function Forgotpassword() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    pass: "",
    pass1: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.patch(`${baseUrl}/password`, user).then((response)=>{
        console.log(response.data);

        if (response.data === "Please enter correct email") {
            return enqueueSnackbar("Please enter correct email", {
              variant: "error",
            });
          } else if (
            response.data === "Password must be between 6 and 12 characters"
          ) {
            return enqueueSnackbar("Password must be between 6 and 12 characters", {
              variant: "error",
            });
          }
          else if (
            response.data === "Passwords do not match"
          ) {
            return enqueueSnackbar("Passwords do not match", {
              variant: "error",
            });
          }
          else {
            navigate('/login')
            return enqueueSnackbar("Password changed successfully", { variant: "success" });
          }
      })
   
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
    }
  };
  return (
    <div className="register">
      <div className="form-section">
        <h1></h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input">
            <label htmlFor="">Email</label>
            <div className="input-box">
              <input
                name="email"
                type="email"
                required
                autoComplete="off"
                onChange={handleChange}
                value={user.email}
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="">New password</label>
            <div className="input-box">
              <input
                type="password"
                required
                autoComplete="off"
                onChange={handleChange}
                value={user.pass}
                name="pass"
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="">Confirm new password</label>
            <div className="input-box">
              <input
                type="password"
                required
                autoComplete="off"
                onChange={handleChange}
                value={user.pass1}
                name="pass1"
              />
            </div>
          </div>

          <button className="btn-login mb-4 " type="submit">
            Change password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
