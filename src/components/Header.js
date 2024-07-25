import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import useUser from "../hooks/use-user";
import * as ROUTES from "../constants/routes";

function Header() {
  // const [activeUser, setActiveUser] = useState({});
  const { logOut, user } = UserAuth();
  const { userObj } = useUser(user, user.uid);
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-white border-b border-gray-300 mb-3">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full"> 
              <Link to={ROUTES.DASHBOARD} aria-label="instagram-logo">
                <img
                  src="\images\IG.png"
                  alt="logo"
                  className="my-auto h-8"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="sign out"
                  onClick={() => {
                    logOut();
                    navigate(ROUTES.LOGIN);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      logOut();
                      navigate(ROUTES.LOGIN);
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  {userObj && (
                    <Link to={`/profile/${userObj?.username}`}>
                      <img
                        src={`/images/avatars/${userObj?.username}.jpg`}
                        alt="user-img"
                        className="h-8 rounded-circle m-0"
                        onError={(e) => {
                          e.target.src = "/images/avatars/default.png";
                        }}
                      />
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="text-white font-bold bg-btnBlue  rounded-md py-1 px-1.5 mx-2"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="text-btnBlue font-bold bg-transparent hover:text-sky-600 hover:underline rounded-md py-1 px-1"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
