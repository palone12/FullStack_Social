import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(
          `https://sociobackend-6w0t.onrender.com/api/auth/register`,
          user
        );
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocioPedia</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocioPedia.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              type="password"
              placeholder="Password"
              ref={password}
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              type="password"
              ref={passwordAgain}
              className="loginInput"
            />
            <button className="loginButton" type="button" onClick={handleClick}>
              Sign Up
            </button>
            <button
              type="button"
              className="loginRegisterButton"
              onClick={(event) => {
                event.stopPropagation();
                navigate("/login");
              }}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
