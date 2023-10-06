import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import './stylesheets/Sidebar.css'

export default function Sidebar() {
  const [friends, setFriends] = useState();

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`http://localhost:3000/user/${user_id}/friends`, {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
      .then((r) => r.json())
      .then((r) => setFriends(r.friends));
  }, []);

  return (
    <div className="sidebar-chat-wrapper">
      <div className="sidebar">
        <div>Sidebar</div>
        {friends &&
          friends.map((friend, index) => {
            return (
              <Link
                to={`/user/${user_id}/conversation/${friend._id}`}
                key={index}
              >
                <div>{friend.name}</div>
              </Link>
            );
          })}
      </div>
      <Outlet />
    </div>
  );
}
