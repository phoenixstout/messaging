import { useState } from "react";
import "./stylesheets/Addfriend.css";

export default function AddFriend() {
  const [friendInput, setFriendInput] = useState("");
  const [autoComplete, setAutoComplete] = useState("");
  const [error, setError] = useState("");
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");

  function handleSubmit(e) {
    e.preventDefault();
    if (friendInput == user) return setError("Cannot be your own friend!");
    if (!friendInput) return setError("Please enter friend's username");
    fetch(`http://localhost:3000/user/${user_id}/friends/requests`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify({ user, friendInput }),
    }).then(() => {
      setError("Friend request sent!");
      setFriendInput("");
    });
  }

  function handleChange(e) {
    setFriendInput(e.target.value);
    if(!e.target.value) return
    fetch(`http://localhost:3000/users/${e.target.value}`)
      .then((r) => r.json())
      .then((r) => console.log(r));
  }

  return (
    <form className="add-friend" action="" onSubmit={handleSubmit}>
      <label htmlFor="friend-name">Add Friend</label>
      <input
        type="text"
        name="friend-name"
        value={friendInput}
        onChange={handleChange}
      />
      <button>Add</button>
      <div>{error}</div>
    </form>
  );
}
