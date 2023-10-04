import { useState, useEffect } from "react"
import Header from "./Header"
import './stylesheets/Messages.css'

export default function Messages() {
    const [friends, setFriends] = useState(null)
    const [choice, setChoice] = useState(null)
    const [taContent, setTAContent] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3000/friends", {
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


      function handleChange(e) {
        setChoice(e.target.value)
      }

      function handleTAChange(e) {
        setTAContent(e.target.value)
      }

      function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/friends/${choice}/messages`, {
            method: "POST",
            headers: {"Content-type": "application/json",
        authorization: 'bearer ' + localStorage.getItem('x-access-token')},
        body: JSON.stringify({content: taContent, choice: choice})
        })
      }

    return (
        <>
            <Header></Header>
            <div className="wrapper">
                <div>
                    <label htmlFor="friend-select">Choose a friend:</label>
                    <select name="pets" id="friend-select" onChange={handleChange}>
                      <option value="">--Please choose a friend--</option>
                            {friends && friends.friends.map((friend, index) => {
                                return <option value={friend.name} key={index}>{friend.name}</option>
                            })}
                    </select>
                </div>
                {choice ? (
                    <form action="" onSubmit={handleSubmit}>
                        <textarea name="content" cols="70" rows="20" onChange={handleTAChange}></textarea>
                        <button>Send</button>
                    </form>
                ) : null}
            </div>
        </>
    )
}