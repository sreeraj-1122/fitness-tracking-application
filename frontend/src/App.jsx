import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Logout from "./components/logout/Logout";
import Profile from "./pages/profile/Profile";
import Editprofile from "./pages/Edit Profile/Editprofile";
import Exercises from "./pages/Exercises/Exercises";
import Workout from "./pages/Workouts/Workout";
import AdminLayout from "./components/Layouts/AdminLayout";
import AdminUsers from "./pages/Adminuser/AdminUsers";
import Adminexercise from "./pages/Adminuser/Adminexercise";
import Nutrition from "./pages/Nutrition/Nutrition";
import { DataContext } from "./context/Datacontext";
import Editexercise from "./pages/Adminuser/Editexercise";
import AddWorkout from "./pages/Workouts/AddWorkout";
import Privateroute from "./pages/Privateroute/Privateroute";
import Forgotpassword from "./pages/forgot password/Forgotpassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Privateroute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="addexercise" element={<Adminexercise />} />
              <Route path="editexercise/:id" element={<Editexercise />} />
            </Route>
            <Route path="/addworkouts" element={<AddWorkout />} />
            <Route path="/editprofile/:id" element={<Editprofile />} />
          <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<Forgotpassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exercises" element={<Exercises />} />
           <Route path="/workouts" element={<Workout />} />
          <Route path="/nutrition" element={<Nutrition />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
