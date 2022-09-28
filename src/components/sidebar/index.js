import { React, useContext } from "react";
import User from "./user";
import Suggestions from "./suggestions";
import loggedInUserContext from "../../context/logged-in-user";

function Sidebar() {
  const { userObj } = useContext(loggedInUserContext);
  const username = userObj?.username;
  const fullName = userObj?.fullName;
  const userId = userObj?.uid;
  const following = userObj?.following;
  const loggedInUserDocid = userObj?.docId;
  // console.log("index.js", foundUser);

  return (
    <div className="container col-span-1 mt-6">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocid={loggedInUserDocid}
      />
      <div className="my-4 py-3">
        <p className="text-xs font-semibold text-gray-300 px-2">
          &copy; 2022 INSTAGRAM CLONE
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
