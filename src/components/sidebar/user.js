import { React, memo } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

function User({ username, fullName }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <div className="grid grid-cols-3 mb-6 mt-6 pt-3">
      <Link to={`/profile/${username}`}>
        <div className="flex items-center justify-between col-span-2">
          <img
            src={`/images/avatars/${username}.jpg`}
            alt=""
            className="rounded-full w-14 flex mr-3 ml-2"
            onError={(e) => (e.target.src = "/images/avatars/default.png")}
          />

          <div className="col-span-2 items-start justify-items-start">
            <p className="font-bold text-sm text-left">{username}</p>
            <p className="text-sm text-gray-400 ">{fullName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(User);

User.propTypes = {
  username: propTypes.string,
  fullName: propTypes.string,
};
