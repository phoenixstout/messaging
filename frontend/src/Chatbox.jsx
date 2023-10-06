import { useEffect, useRef, useState } from "react";
import "./stylesheets/Chatbox.css";

export default function Chatbox() {
  const [friends, setFriends] = useState(null);
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState();
  const [messages, setMessages] = useState([]);
  const submitBtn = useRef(null);

  const user = localStorage.getItem("user");

  useEffect(() => {
    fetch("http://localhost:3000/friends", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if(r.friends[0]) {setSelection(r.friends[0]._id);
        setFriends(r.friends);
        handleSelectChange(r.friends[0]._id);}
      });
  }, []);

  function handleSelectChange(friend_id) {
    setSelection(friend_id);
    if (friend_id == "1") return;
    fetch(`http://localhost:3000/friends/${friend_id}/conversation`, {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setMessages(r);
      });
  }

  if (!friends) return;

  function handleSubmit(e) {
    e.preventDefault();
    if (!selection) return;
    if (!message.replace(/\s/g, '').length) {
      return console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
    }
    fetch(`http://localhost:3000/friends/${selection}/conversation`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify({ message }),
    }).then((r) => {
      setMessages((prev) => [...prev, { content: message, author: user }]);

      setMessage("");
    });
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      submitBtn.current.click();
    }
  }

  return (
    <div className='chatbox'>
      <div className="title">
        <div>Chat with ...</div>
        <select
          onChange={(e) => handleSelectChange(e.target.value)}
          name="friend-selection"
          defaultValue={friends[0] ? friends[0]._id : null}
        >
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
      <div className="wrapper">
        
        <div className="history">
          {messages &&
            messages.map((message, index) => {
              if (message.author == user)
                return (
                  <div className="user-message" key={index}>
                    <div className="message">{message.content}</div>
                  </div>
                );
              else
                return (
                  <div className="friend-message" key={index}>
                    <div className="message">{message.content}</div>
                  </div>
                );
            })}
        </div>
      </div>
      <div className="new-message">
          <form action="" onSubmit={handleSubmit}>
            <textarea
              type="text"
              name="message"
              placeholder="Send message..."
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            ></textarea>
            <button ref={submitBtn} className="send-message-btn">
              Send
            </button>
          </form>
        </div>
    </div>
  );
}
