import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useSnackbar } from "notistack";
import { DataContext } from "../../context/Datacontext";

function Login() {
  const { enqueueSnackbar } = useSnackbar();

  const { storeTokenInLs, storeIdInLs,isAdminOrNot } = useContext(DataContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",    //admin@gmail.com   <=admin email address
    password: "", //admin123          <=admin password
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
      const result = await axios.post("http://localhost:5000/login", user);
      const userToken = result.data.Token;
      if (result.status === 200 && userToken) {
        const res_data = await result;
        storeTokenInLs(res_data.data.Token);
        isAdminOrNot(result.data.userExist.isAdmin);
        storeIdInLs(res_data.data.userExist._id);
        console.log(res_data.data.userExist.isAdmin);

        enqueueSnackbar("Login successful", { variant: "success" });
        if (res_data.data.userExist.isAdmin) {
          return navigate("/admin/users");
        } else {
          return navigate("/");
        }
        // window.location.reload();
      } else {
        enqueueSnackbar("email and password does not match", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
    }
  };
  return (
    <div className="register">
      <div className="form-section">
        <h1>Login</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
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
            <label htmlFor="">Password</label>
            <div className="input-box">
              <input
                type="password"
                required
                autoComplete="off"
                onChange={handleChange}
                value={user.password}
                name="password"
              />
            </div>
            <span className="pe-2 forgot-pass" onClick={()=>navigate('/password')}>Forgot password?</span>
          </div>

          <button className="btn-login" type="submit">
            Login
          </button>
          <p>
            Not a member?
            <span>
              {" "}
              <Link to="/register" className="text-decoration-none  ">
                Signup now
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
