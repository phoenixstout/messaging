import "./stylesheets/Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: null,
    password: null,
  });

  const [valid, setValid] = useState(true);
  const [serverError, setServerError] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://52.25.203.21:3000/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: inputs.username,
        password: inputs.password,
      }),
    })
      .then((r) => {
        if (r.status != 200) setServerError(true);
        else {
          setServerError(false);
          return r.json();
        }
      })
      .then((r) => {
        localStorage.setItem("user", r.user);
        localStorage.setItem("user_id", r.user_id);
        localStorage.setItem("x-access-token", r.token);
        if(r.friend === undefined) window.location.href = `/user/${r.user_id}/friends`
        else window.location.href = `/user/${r.user_id}/conversation/${r.friend}`;
      })
      .catch(e => console.log(e))
      ;
  }

  function handleChange(e) {
    if (e.target.name === "username") {
      setInputs((prev) => {
        return { ...prev, username: e.target.value };
      });
    }
    if (e.target.name === "password") {
      setInputs((prev) => {
        return { ...prev, password: e.target.value };
      });
    }
    if (e.target.name === "confirm_password") {
      if (e.target.value != inputs.password) {
        setValid(false);
      } else setValid(true);
      setInputs((prev) => {
        return { ...prev, confirmPassword: e.target.value };
      });
    }
  }

  return (
    <div>
      <form className="login" action="" onSubmit={handleSubmit}>
        <div className="username input-wrapper">
          <label htmlFor="username">Username </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="password input-wrapper">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={valid ? null : "invalid"}
          />
        </div>
        <button>Log In</button>
      </form>
      {!valid ? <div>Passwords must match</div> : null}
      {serverError ? (
        <div className="server-error">Username or password is incorrect</div>
      ) : null}
      <div className="no-account">
        <div>Don't have an account?</div>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
