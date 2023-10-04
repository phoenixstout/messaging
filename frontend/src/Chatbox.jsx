import { useEffect, useState } from "react";
import "./stylesheets/Chatbox.css";

export default function Chatbox() {
  const [friends, setFriends] = useState(null);
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState();
  const [messages, setMessages] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/friends", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
      .then((r) => r.json())
      .then((r) => setFriends(r.friends));
  }, []);

  function handleSelectChange(e) {
    console.log(e.target.value);
    setSelection(e.target.value);
    if (e.target.value == "1") return;
    fetch(`http://localhost:3000/friends/${e.target.value}/conversation`, {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
    .then(r=> r.json())
    .then(r => {
      console.log(r)
      setMessages(r)
    })
  }

  if (!friends) return;

  function handleSubmit(e) {
    e.preventDefault();
    if(!selection) return
    console.log(message);
    fetch(`http://localhost:3000/friends/${selection}/conversation`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify({message}),
    })
    .then(window.location.reload())
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="wrapper">
      <div className="title">
        <div>Chat with ...</div>
        <select onChange={handleSelectChange} name="friend-selection">
          <option value={1}>Select Friend</option>
          {friends &&
            friends.map((friend, index) => {
              return (
                <option value={friend._id} key={index}>
                  {friend.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="history">
        {messages && messages.map((message, index) => {
          return <div key={index}>{message.content}</div>
        })}
      </div>
      <div className="new-message">
        <form action="" onSubmit={handleSubmit}>
          <textarea
            type="text"
            name="message"
            placeholder="Send message..."
            onChange={handleChange}
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
