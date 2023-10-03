import { useState } from "react"

export default function AddFriend() {
    const [friendInput, setFriendInput] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3000/addfriend', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                authorization:"bearer " + localStorage.getItem('x-access-token')
            },
            body: JSON.stringify({friendInput})
        })
        .then(window.location.reload())

    }

    function handleChange(e) {
        setFriendInput(e.target.value)
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="friend-name">Add Friend</label>
            <input type="text" name="friend-name" onChange={handleChange} />
            <button>Add</button>
        </form>
    )
}