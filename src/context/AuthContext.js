import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import propTypes from "prop-types";
import { auth } from "../libraries/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        // console.log(currentUser);
        setUser(currentUser);
      } else {
        localStorage.removeItem("currentUser");
        setUser(null);
      }
    });
    return () => {
      listener();
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ createUser, user, login, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
AuthContextProvider.propTypes = {
  children: propTypes.object.isRequired,
};

export const UserAuth = () => {
  return useContext(UserContext);
};
