import { Link } from "react-router-dom";
import "./stylesheets/Header.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Header() {
  const [profilePicUrl, setProfilePicUrl] = useState();

  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id")
  

  useEffect(() => {
    if(profilePicUrl) return
    if(!user) return
    fetch(`http://localhost:3000/photo/${user}`, {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
    .then(r=> r.blob())
    .then(r => {
        setProfilePicUrl(URL.createObjectURL(r))
    })
    ;
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
        <Link to={`/user/${user_id}`}>Home</Link>
        <Link to={`/user/${user_id}/friends`}>Friends</Link>
        <Link to={`/user/${user_id}/account`}>Account</Link>
        <a href="" onClick={handleLogout}>
          Log Out
        </a>
        <img className="profile-pic-header"
          src={profilePicUrl && profilePicUrl}
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
