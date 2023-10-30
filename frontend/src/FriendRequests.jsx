import { useEffect, useState } from "react";
import "./stylesheets/FriendRequests.css";


export default function FriendRequests() {
  const [friendrequests, setFriendRequests] = useState(null);

  const user_id = localStorage.getItem('user_id')

  useEffect(() => {
    fetch(`/api/user/${user_id}/friends/requests`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
      .then((r) => r.json())
      .then((r) => {
          setFriendRequests(r);
      });
  }, []);

  function handleClick(confirm, friend) {
    fetch(`/api/user/${user_id}/friends/requests`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify({ confirm, friend }),
    })
      .then((r) => console.log(r))
  }

  if (!friendrequests) {
    return (
      <h3>Friend Requests</h3>
  )}

  return (
    <>
      <div className="friend-requests-wrapper">
        <h3>Friend Requests</h3>
        {friendrequests.incoming.map((request, index) => {
          return (
            <div className="request-wrapper" key={index}>
              <div>{request.username}</div>
              <button onClick={() => handleClick(true, request)}>
                Confirm
              </button>
              <button onClick={() => handleClick(false, request)}>Deny</button>
            </div>
          );
        })}
        {friendrequests.outgoing.map((request, index) => {
          return (
            <div className="outgoing sent-friend-wrapper" key={index}>
                <div className="sent-friend">{request.username}</div>
                <i>Sent</i>
            </div>
          );
        })}
      </div>
    </>
  );
}
