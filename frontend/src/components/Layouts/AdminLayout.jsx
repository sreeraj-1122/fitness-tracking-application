import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
function AdminLayout() {
  return (
    <div className="adimin-user">
      {/* <Navbar expand="lg" className="bg-body-tertiary shadow-sm " sticky="top">
        <Container>
          <Link
            to="/admin"
            className="p-2 fs-3 text-decoration-none text-dark fw-bolder "
          >
            Fit Me
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto d-flex align-items-lg-center gap-4 fs-5 fw-medium    ">
              <Link to="users" className="text-decoration-none text-dark">
                Users
              </Link>
              <Link to="addexercise" className="text-decoration-none text-dark">
                Exercises
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <div className="admin-right-section">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
