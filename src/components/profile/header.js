import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { UserAuth } from "../../context/AuthContext";
import useUser from "../../hooks/use-user";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername,
  },
}) {
  const { user } = UserAuth();
  // console.log("logged in user", user);
  const { userObj } = useUser(user, user?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  // const [btnText, setBtnText] = useState("");
  const followBtnActive =
    userObj?.username && userObj?.username !== profileUsername;
  console.log(isFollowingProfile);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);

    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    console.log(isFollowingProfile);
    await toggleFollow(
      isFollowingProfile,
      userObj.docId,
      profileDocId,
      profileUserId,
      userObj.uid
    );
  };

  useEffect(() => {
    async function isLoggedInUserFollowingProfile() {
      const isFollowing = await isUserFollowingProfile(
        userObj.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    }
    if (userObj && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [userObj?.username, profileUserId]);
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center ">
        {profileUsername ? (
          <img
            className="rounded-full h-40 w-40 flex mt-6"
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${fullName} profile picture`}
            onError={(e) => {
              e.target.src = `/images/avatars/default.png`;
            }}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-1">
        <div className="container flex items-center justify-between">
          <p className="text-3xl font-thin">{profileUsername}</p>
          {followBtnActive && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            followBtnActive && (
              <button
                className="text-md font-bold bg-btnBlue text-white py-1 px-2 rounded mt-2 mr-10"
                onClick={handleToggleFollow}
              >
                {isFollowingProfile ? "Unfollow" : "Follow"}
              </button>
            )
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount} </span>posts
              </p>
              <p className="mr-10">
                <span className="font-bold">{followers.length} </span> followers
              </p>
              <p className="mr-10">
                {" "}
                <span className="font-bold">{following.length} </span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-semibold text-lg">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: propTypes.number.isRequired,
  followerCount: propTypes.number.isRequired,
  setFollowerCount: propTypes.func.isRequired,
  profile: propTypes.shape({
    profileDocId: propTypes.string,
    docId: propTypes.string,
    userId: propTypes.string,
    fullName: propTypes.string,
    username: propTypes.string,
    followers: propTypes.array,
    following: propTypes.array,
  }).isRequired,
};
