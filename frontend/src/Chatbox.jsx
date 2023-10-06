import { useEffect, useRef, useState } from "react";
import "./stylesheets/Chatbox.css";
import { useParams } from "react-router-dom";

export default function Chatbox() {
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState();
  const [messages, setMessages] = useState([]);
  const submitBtn = useRef(null);
  const { friend_id } = useParams();
  const user_id = localStorage.getItem('user_id')

  console.log('ids: ', user_id, friend_id)

  const user = localStorage.getItem("user");

  useEffect(()=> {
    if(!friend_id) return
    fetch(`http://localhost:3000/user/${user_id}/conversation/${friend_id}`, {
      method: "GET",
      headers: {authorization: 'bearer ' + localStorage.getItem('x-access-token')}
    })
    .then(r => r.json())
    .then(r=> setMessages(r))
  }, [friend_id])

  function handleSubmit(e) {
    e.preventDefault();
    if (!selection) return;
    if (!message.replace(/\s/g, "").length) {
      return console.log(
        "string only contains whitespace (ie. spaces, tabs or line breaks)"
      );
    }
    fetch(
      `http://localhost:3000/user/${user_id}/conversation/${friend_id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("x-access-token"),
        },
        body: JSON.stringify({ message }),
      }
    ).then((r) => {
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
    <div className="chatbox">
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
