import { Link } from "react-router-dom";
import "./stylesheets/Header.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [profilePicUrl, setProfilePicUrl] = useState();

  const user = localStorage.getItem("user");

  useEffect(() => {
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
      <nav className="header">
        <Link to="/">Home</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/account">Account</Link>
        <a href="" onClick={handleLogout}>
          Log Out
        </a>
        <img className="profile-pic-header"
          src={profilePicUrl && profilePicUrl}
          alt=""
        />
      </nav>
    );
  } else {
    return (
      <nav className="header">
        <Link to={"/login"}>Login</Link>
      </nav>
    );
  }
}
