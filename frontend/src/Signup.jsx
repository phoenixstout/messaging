import Header from "./Header"
import './stylesheets/Signup.css'
import { useState } from "react"

export default function Signup() {
    const [inputs, setInputs] = useState({
        username: null,
        password: null,
        confirmPassword: null
    })

    const [valid, setValid] = useState(true)

    const [serverError, setServerError] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3000/signup', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(inputs)
        })
        .then(r => r.json())
        .then(r => {
            if(r.error) setServerError(r.error)
            else { window.location.href ='/login'}
        })
    }

    function handleChange(e) {
        if(e.target.name === 'username') {
            setInputs(prev => {return {...prev, username:e.target.value}})
        }
        if(e.target.name === 'password') {
            setInputs(prev => {return {...prev, password:e.target.value}})
        }
        if(e.target.name === 'confirm_password') {
            if(e.target.value != inputs.password) {
                setValid(false)
            }
            else(setValid(true))
            setInputs(prev => {return {...prev, confirmPassword:e.target.value}})
        }
        
    }

    return (
        <div>
            <Header></Header>
            <form className="login" action="" onSubmit={handleSubmit}>
                <div className="username input-wrapper">
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
                </div>
                <div className="password input-wrapper">
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className={valid? null : 'invalid'}/>
                </div>
                <div className="confirm-password input-wrapper">
                    <label htmlFor="confirm-password">Confirm Password </label>
                    <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} className={valid? null : 'invalid'} />
                </div>
                <button>Sign Up</button>
            </form>
            {!valid ? <div>Passwords must match</div> : null}
            <div>{serverError}</div>

        </div>

    )
}