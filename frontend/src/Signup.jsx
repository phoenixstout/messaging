import "./stylesheets/Signup.css";
import { useEffect, useState } from "react";

export default function Signup() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: null,
  });

  const [usernameValid, setUsernameValid] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [matchValid, setMatchValid] = useState(true);
  const [matchError, setMatchError] = useState("");

  const [serverError, setServerError] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    if (!usernameValid | !passwordValid | !matchValid) return;
    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputs),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.error) setServerError(r.error);
        else {
          window.location.href = "/login";
        }
      });
  }

  useEffect(() => {
    // if(inputs.username.length < 5) return setUsernameValid(false)
    if (inputs.username == "") return setUsernameError("");
    fetch(`http://52.25.203.21:80/users/${inputs.username}`)
      .then((r) => r.json())
      .then((r) => {
        setUsernameError("Username taken");
        setUsernameValid(!r.valid);
      });
  }, [inputs.username]);

  useEffect(() => {
    if (inputs.password == "") return setUsernameError("");
    if (inputs.password.length < 7) {
      setPasswordValid(false);
      setPasswordError("Must be at least 7 characters");
    } else {
      setPasswordValid(true);
    }
    if (inputs.password != inputs.confirmPassword) {
      setMatchValid(false);
      setMatchError("Passwords must match");
    } else {
      setMatchValid(true);
    }
  }, [inputs.password]);

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
        setMatchValid(false);
      } else setMatchValid(true);
      setInputs((prev) => {
        return { ...prev, confirmPassword: e.target.value };
      });
    }
  }

  return (
    <div>
      <form className="login" action="" onSubmit={handleSubmit}>
        <div className={`username input-wrapper `}>
          <label htmlFor="username">Username </label>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className={usernameValid ? "valid" : "invalid"}
            />
            <div className="error-message">
              {!usernameValid && usernameError}
            </div>
          </div>
        </div>
        <div className="password input-wrapper">
          <label htmlFor="password">Password </label>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={passwordValid ? null : "invalid"}
            />
            <div className="error-message">
              {!passwordValid && passwordError}
            </div>
          </div>
        </div>
        <div className="confirm-password input-wrapper">
          <label htmlFor="confirm-password">Confirm Password </label>
          <div>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className={matchValid ? null : "invalid"}
            />
            <div className="error-message">{!matchValid && matchError}</div>
          </div>
        </div>
        <button>Sign Up</button>
      </form>
      <div>{serverError}</div>
    </div>
  );
}
