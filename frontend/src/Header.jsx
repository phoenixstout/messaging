import { Link } from "react-router-dom";
import "./stylesheets/Header.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Header() {
  const [profilePicUrl, setProfilePicUrl] = useState();
  const [friendId, setFriendID] = useState()

  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem('x-access-token')
  

  useEffect(() => {
    if (profilePicUrl) return;
    if (!user) return;
    fetch(`${import.meta.env.VITE_API_URL}/photo/${user_id}`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((r) => {
        setProfilePicUrl(r.url);
      });
  }, []);

  useEffect(()=>{
    if(friendId) return
    if(!token) return
    fetch(`${import.meta.env.VITE_API_URL}/user/${user_id}/friends`, {
      method: "GET",
      headers: {authorization: 'bearer ' + token}
    })
    .then(r => r.json())
    .then(r => {
      if(r.friends.length === 0) return
      setFriendID(r.friends[0]._id)
    })
  }, [])

  function handleLogout() {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    window.location.reload();
  }

  if (user) {
    return (
      <>
        <nav className="header">
          <Link to={`/user/${user_id}/conversation/${friendId ? friendId : ''}`}>Home</Link>
          <Link to={`/user/${user_id}/friends`}>Friends</Link>
          <Link to={`/user/${user_id}/account`}>Account</Link>
          <a href="" onClick={handleLogout}>
            Log Out
          </a>
          <img
            className="profile-pic-header"
            src={profilePicUrl && `${import.meta.env.VITE_API_URL}/${profilePicUrl}`}
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
