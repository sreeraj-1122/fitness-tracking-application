import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DataContext } from "../../context/Datacontext";

const Privateroute = () => {
  const { isLoggedIn } = useContext(DataContext);
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default Privateroute;
