import { useEffect, useState } from "react";
import "./stylesheets/FriendRequests.css";

export default function FriendRequests() {
  const [friendrequests, setFriendRequests] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/friends/requests", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r[0]) {
          setFriendRequests(r);
        }
      });
  }, []);

  function handleClick(confirm, friend) {
    fetch("http://localhost:3000/friends/requests", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify({ confirm, friend }),
    })
      .then((r) => r.json())
      .then((r) => {
        window.location.reload();
      });
  }

  if (!friendrequests) return;

  return (
    <>
      <div className="friend-requests-wrapper">
        <h3>Friend Requests</h3>
        {friendrequests.map((request, index) => {
          return (
            <div className="request-wrapper" key={index}>
              <div>{request}</div>
              <button onClick={() => handleClick(true, request)}>
                Confirm
              </button>
              <button onClick={() => handleClick(false, request)}>Deny</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
