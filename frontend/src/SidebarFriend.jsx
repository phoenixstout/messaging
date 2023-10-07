import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './stylesheets/Sidebar.css'

const user_id = localStorage.getItem("user_id");

export default function SidebarFriend({ friend_id }) {
  const [friend, setFriend] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/friends/${friend_id}/profilepic`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((r) => {
        setFriend(r);
      });
  }, []);

  if (!friend) return;

  return (
    <Link to={`/user/${user_id}/conversation/${friend_id}`}>
      <div className="friend-wrapper">
        <div>{friend.username}</div>
        <img
          className="sidebar profilepic"
          src={`http://localhost:3000/${friend.profile_pic}`}
          alt=""
        />
      </div>
    </Link>
  );
}
