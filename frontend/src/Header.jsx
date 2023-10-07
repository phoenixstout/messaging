import { Link } from "react-router-dom";
import "./stylesheets/Header.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Header() {
  const [profilePicUrl, setProfilePicUrl] = useState();

  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (profilePicUrl) return;
    if (!user) return;
    fetch(`http://localhost:3000/photo/${user_id}`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((r) => {
        setProfilePicUrl(r.url);
      });
  }, []);

  function handleLogout() {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("user");
    window.location.reload();
  }

  if (user) {
    return (
      <>
        <nav className="header">
          <Link to={`/user/${user_id}/conversation`}>Home</Link>
          <Link to={`/user/${user_id}/friends`}>Friends</Link>
          <Link to={`/user/${user_id}/account`}>Account</Link>
          <a href="" onClick={handleLogout}>
            Log Out
          </a>
          <img
            className="profile-pic-header"
            src={profilePicUrl && `http://localhost:3000/${profilePicUrl}`}
            alt=""
          />
        </nav>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <nav className="header">
          <Link to={"/login"}>Login</Link>
        </nav>
        <Outlet />
      </>
    );
  }
}
