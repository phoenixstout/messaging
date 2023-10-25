import { useEffect, useState } from "react";
import AddFriend from "./Addfriend";
import FriendRequests from "./FriendRequests";
import Header from "./Header";
import './stylesheets/Friends.css'

export default function Friends() {
  const [friends, setFriends] = useState();

  const user_id = localStorage.getItem('user_id')

  if(!localStorage.getItem('x-access-token')) {
    window.location.href = '/'
  }

  useEffect(() => {
    fetch(`http://localhost:3000/user/${user_id}/friends`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
    .then(r => r.json())
    .then(r => {
        setFriends(r)
    })
    .catch(()=> {
      console.log('error fetching list of friends')
    })
  }, []);

  return (
    <>
      <AddFriend />
      <div className="requests-friends">
          <FriendRequests />
          <div className="my-friends">
            <h3>My Friends</h3>
              {friends &&
                friends.friends.map((friend, index) => {
                  return <div key={index}>{friend.name.username}</div>;
                })}
          </div>
      </div>
    </>
  );
}
