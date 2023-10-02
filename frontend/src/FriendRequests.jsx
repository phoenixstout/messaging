import { useEffect, useState } from "react";

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
        setFriendRequests(r[0].friend_requests);
      });
  }, []);

  if(!friendrequests) return

  return (
    <>
    <h3>Friend Requests</h3>
    {friendrequests.map(request => {
        return(
            <div>{request}</div>
        )
    })}
    </>
  )
}
