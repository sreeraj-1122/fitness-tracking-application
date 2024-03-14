// Import necessary modules
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

// Define the Register component
function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const [imageURL, setImageURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  // Initialize state variables
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");

  // Function to handle image upload
  const isImageFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      let imageURL = URL.createObjectURL(selectedFile);
      setImageURL(imageURL);
    }
    if (selectedFile && isImageFile(selectedFile)) {
      setProfile([selectedFile]);
    } else {
      setProfile(""); // Clear the file state if not an image
      enqueueSnackbar("Please select a valid image file (e.g., JPG, PNG).", {
        variant: "error",
      });
    }
  };

  const data = new FormData();
  data.append("name", name);
  data.append("email", email);
  data.append("number", number);
  data.append("password", password);
  data.append("profile", profile[0]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to the server
      console.log(data, "form");
      const response = await axios.post("http://localhost:5000/register", data);
      console.log(response.data);
      if (response.data === "Email already exist") {
        return enqueueSnackbar("Email already existed", { variant: "error" });
      } else if (response.data === "password must between 6 and 12") {
        return enqueueSnackbar("password must between 6 and 12", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("registration successful", {
          variant: "success",
        });
        navigate("/login");
      }

      // Redirect to login page after successful registration
    } catch (error) {
      // Handle errors
      enqueueSnackbar("something wrong", { variant: "error" });
      console.error(error);
    }
  };

  // Return the JSX for the Register component
  return (
    <div className="register">
      <div className="form-section">
        {/* Form for user registration */}
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Input for profile picture */}
          <div className="image-div">
            <label htmlFor="input-file">
              <img src={imageURL} alt="Profile" />
            </label>
            <input
              type="file"
              id="input-file"
              onChange={handleImageUpload}
              name="profile"
              accept="image/png, image/jpeg"
            />
          </div>
          {/* Input fields for name, email, mobile number, and password */}
          <div className="input">
            <label htmlFor="name">Name</label>
            <div className="input-box">
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <div className="input-box">
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                title="Please enter a correct email"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="number">Mobile Number</label>
            <div className="input-box">
              <input
                type="text"
                id="number"
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit mobile number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <div className="input-box">
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          {/* Button to submit the registration form */}
          <button className="btn-login" type="submit">
            Register
          </button>
          {/* Link to the login page */}
          <p>
            Already registered?{" "}
            <Link to="/login" className="text-text-decoration-none">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Export the Register component
export default Register;
