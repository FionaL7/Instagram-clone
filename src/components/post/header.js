import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export default function Header({ username }) {
  return (
    <div className="flex border-b border-gray-primary h-10 pb-2 pt-2 px-3 my-2">
      <div className="flex my-auto items-center">
        <Link to={`/profile/${username}`} className="flex items-center">
          <img
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile picture`}
            className="rounded-full h-8 w-8 mx-2"
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}
Header.propTypes = {
  username: propTypes.string,
};
