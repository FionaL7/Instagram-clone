import { useState } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import {
  updateFollowingList,
  updateFollowedUserFollowers,
} from "../../services/firebase";

function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocid,
}) {
  const [followed, setFollowed] = useState(false);

  const handleFollowing = async () => {
    setFollowed(true);

    updateFollowingList(loggedInUserDocid, profileId, false);
    updateFollowedUserFollowers(profileDocId, userId, false);
  };

  return !followed ? (
    <div className="flex flex-row items-center justify-between ml-0 pl-2">
      <div className="flex items-center justify-between ml-0">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt="img"
          className="rounded-full w-10 flex mr-3"
          onError={(e) => {
            e.target.src = `/images/avatars/default.jpg`;
          }}
        />
        <Link to={`/profile/${username}`}>
          <p className="font-bold text-sm text-left">{username}</p>
        </Link>
      </div>

      <button
        className="text-xs font-bold text-btnBlue"
        onClick={handleFollowing}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  profileId: propTypes.string.isRequired,
  userId: propTypes.string,
  loggedInUserDocid: propTypes.string,
};

export default SuggestedProfile;
