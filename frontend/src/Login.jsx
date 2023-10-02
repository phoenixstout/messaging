import Header from "./Header"
import './stylesheets/Login.css'
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
    const [inputs, setInputs] = useState({
        username: null,
        password: null,
    })

    const [valid, setValid] = useState(true)

    function handleSubmit(e) {

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
                <button>Log In</button>
            </form>
            {!valid ? <div>Passwords must match</div> : null}

            <div>
                <div className="no-account">
                    Don't have an account?
                </div>
                <Link to='/signup'>Sign up</Link>
            </div>
        </div>

    )
}