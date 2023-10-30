import { useState } from "react";
import "./stylesheets/Addfriend.css";


export default function AddFriend() {
  const [friendInput, setFriendInput] = useState("");
  const [friendID, setFriendID] = useState('')
  const [autoComplete, setAutoComplete] = useState();
  const [error, setError] = useState("");
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");

  function handleSubmit(e) {
    e.preventDefault();
    if (friendInput == user) return setError("Cannot be your own friend!");
    if (!friendInput) return setError("Please enter friend's username");
    fetch(`${import.meta.env.VITE_API_URL}/user/${user_id}/friends/requests`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify({ user, friendInput }),
    }).then(() => {
      setError("Friend request sent!");
      setFriendInput("");
      setAutoComplete()
    });
  }

  function handleChange(e) {
    setFriendInput(e.target.value);
    if(!e.target.value) return setAutoComplete()
    fetch(`${import.meta.env.VITE_API_URL}/users/${e.target.value}`)
      .then((r) => r.json())
      .then(r => {
        if(!r.users.length) return setAutoComplete()
        setAutoComplete(r.users)})
  }

  function handleAutoComplete(username, id) {
    setFriendInput(username)
    setFriendID(id)
  }

  return (
    <div>
      <form className="add-friend" action="" onSubmit={handleSubmit}>
        <label htmlFor="friend-name">Add Friend</label>
        <div className="input-wrapper">
          <input className="user-search"
            type="text"
            name="friend-name"
            value={friendInput}
            onChange={handleChange}
          />
      {autoComplete && <div className="autocomplete">
        {autoComplete.map(suggestion => {
          return (
            <div className='suggestion' key={suggestion.id} value={suggestion._id} onClick={() => handleAutoComplete(suggestion.username, suggestion._id)}>{suggestion.username}</div>
          )
        })}
      </div>}
        <div className="error">{error}</div>
        </div>
        <button>Add</button>
      </form>
    </div>
  );
}
