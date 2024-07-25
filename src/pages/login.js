import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import * as ROUTES from "../constants/routes";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isInvalid = email === "" || password === "";
  const { login } = UserAuth();

  useEffect(() => {
    document.title = "Login-Instagram";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (e) {
      setEmail("");
      setPassword("");
      setError(e.message);
      console.log(e.message);
    }
    // console.log(username, password);
  };

  return (
    <div className="container flex max-w-screen-md items-center ">
      <div className="flex h-screen w-2/3">
        <img
          src="\images\Screenshot 2022-07-01 195842.png"
          alt="iphone-screen"
          className="h-4/5 mt-10"
        />
      </div>
      <div className="h-screen my-auto">
        <div className="bg-white text-center mt-16 h-80 border border-gray-300 px-1">
          <img src="\images\IG.png" alt="logo" className="my-8 py-2" />
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email or username"
              name="username"
              className="bg-gray-50 border border-gray-300 p-1 w-4/5 my-1"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              className="bg-gray-50 border border-gray-300 p-1 w-4/5 my-1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="mt-3">
              <button
                className={`bg-btnBlue text-white w-4/5 rounded py-1 ${
                  isInvalid && "opacity-40"
                }`}
                disabled={isInvalid}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white text-center mt-3 border border-gray-300 py-4">
          <p className="text-sm">
            Dont have an account?
            <Link to={ROUTES.SIGN_UP} className="font-bold text-btnBlue">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
