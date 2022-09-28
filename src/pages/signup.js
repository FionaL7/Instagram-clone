import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { UserAuth } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../libraries/firebase";
import { updateProfile } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const isInvalid = email === "" || password === "";
  const { createUser } = UserAuth();

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await createUser(email, password);
      const user = res.user;
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username.toLowerCase(),
        fullName,
        authProvider: "local",
        email: email.toLowerCase(),
        following: ["2"],
        followers: [],
        dateCreated: Date.now(),
      });
      navigate(ROUTES.DASHBOARD);
    } catch (e) {
      alert(e.message);
      setError(e.message);
      setEmail("");
      setFullName("");
      setUsername("");
      setPassword("");
    }
  };
  return (
    <div className="container flex max-w-xs my-3 items-center ">
      <div className="h-screen my-auto">
        <div className="bg-white text-center mt-14 h-5/6 border border-gray-300 px-1">
          <img
            src="\images\logo.png"
            alt="logo"
            className="mt-6 mb-4 py-2 text-sm"
          />
          <div className="mx-auto mb-4">
            <h4 className="font-medium text-gray-500">
              Sign up to see photos and videos from your friends.
            </h4>
          </div>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Email"
              name="username"
              className="bg-gray-50 border border-gray-300 px-2 py-2 w-4/5 my-1 text-sm"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              className="bg-gray-50 border border-gray-300 px-2 py-2 w-4/5 my-1 text-sm"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="bg-gray-50 border border-gray-300 px-2 py-2 w-4/5 my-1 text-sm"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="bg-gray-50 border border-gray-300 px-2 py-2 w-4/5 my-1 text-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="my-5">
              <p className="text-xs font-normal text-gray-400">
                People who use our service may have uploaded your contact
                information to Instagram. <br /> <b>Learn More</b> <br /> By
                signing up, you agree to our <b>Terms</b> , <b>Data Policy</b>{" "}
                and
                <b>Cookies Policy</b> .
              </p>
            </div>
            <div className="mt-3">
              <button
                className={`bg-btnBlue text-white w-4/5 rounded py-1 ${
                  isInvalid && "opacity-40"
                }`}
                disabled={isInvalid}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white text-center mt-3 border border-gray-300 py-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-btnBlue">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
