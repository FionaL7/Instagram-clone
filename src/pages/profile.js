import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import UserProfile from "../components/profile/index";
import Header from "../components/Header";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const [theUser] = await getUserByUsername(username);
      // console.log(theUser.uid);
      if (theUser?.uid || theUser?.userId) {
        setUser(theUser);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, navigate]);
  // console.log("set user set to:", user);

  return user?.username ? (
    <div className="bg-backgroundGrey">
      <Header />
      <div className="mx-auto max-w-screen-lg ">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
