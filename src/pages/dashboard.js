import { React, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import useUser from "../hooks/use-user";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar";
import loggedInUserContext from "../context/logged-in-user";

function Dashboard() {
  const { user } = UserAuth();
  const { userObj, setActiveUser } = useUser(user, user?.uid);

  // console.log("dashboard", userObj);
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <loggedInUserContext.Provider
      value={{
        userObj,
        setActiveUser,
      }}
    >
      <div className="bg-backgroundGrey ">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between h-full mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </loggedInUserContext.Provider>
  );
}

export default Dashboard;
