import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./stylesheets/Sidebar.css";
import SidebarFriend from "./SidebarFriend";

export default function Sidebar() {
  const [friends, setFriends] = useState();

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`/api/user/${user_id}/friends`, {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setFriends(r.friends)});
  }, []);

  return (
    <div className="sidebar-chat-wrapper">
      <div className="sidebar">
        <div className="ftitle">Friends</div>
        {friends &&
          friends.map((friend, index) => {
            return (
              <SidebarFriend friend_id={friend._id} key={index} />
            );
          })}
      </div>
      <Outlet />
    </div>
  );
}
