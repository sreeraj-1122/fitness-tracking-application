import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../context/Datacontext";
import Image from "react-bootstrap/Image";
function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useContext(DataContext);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm " sticky="top">
        <Container>
          <Link
            to={isAdmin==='true'?'/admin/users':'/'}
            className="p-2 fs-3 text-decoration-none text-dark fw-bolder "
          >
            Fit Me
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAdmin==='true' ? (
              <>
                <Nav className="m-auto d-flex align-items-lg-center gap-4 fs-5 fw-medium    ">
                  <Link
                    to="/admin/users"
                    className="text-decoration-none text-dark"
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/addexercise"
                    className="text-decoration-none text-dark"
                  >
                    Exercises
                  </Link>
                </Nav>
                <Button
                  type="submit"
                  className="fw-bold "
                  variant="danger"
                  onClick={() => navigate("/logout")}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav className="m-auto d-flex align-items-lg-center gap-4 fs-5 fw-medium    ">
                  <Link to="/" className="text-decoration-none text-dark">
                    Home
                  </Link>
                  <Link
                    to="/exercises"
                    className="text-decoration-none text-dark"
                  >
                    Exercises
                  </Link>
                  <Link
                    to="/workouts"
                    className="text-decoration-none text-dark"
                  >
                    Workout plans
                  </Link>
                  <Link
                    to="/nutrition"
                    className="text-decoration-none text-dark"
                  >
                    Nutrition
                  </Link>
                </Nav>
                {isLoggedIn ? (
                  <>
                    <Link to="/profile">
                      <img
                        className="header-img"
                        src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                        alt=""
                        style={{
                          width: "55px",
                          height: "55px",
                          borderRadius: "50px",
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      type="submit"
                      className="fw-bold "
                      variant="success"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </>
                )}
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
