import { useState, useEffect } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { where, query, collection, getDocs } from "firebase/firestore";
import { db } from "../../libraries/firebase";
import SuggestedProfile from "./suggested-profile";

function Suggestions({ userId, following, loggedInUserDocid }) {
  const [profiles, setProfiles] = useState(null);
  // console.log(userId);
  async function getSuggestedProfiles(userId, following) {
    var q = query(
      collection(db, "users"),
      where("userId", "not-in", [...following, userId])
    );
    const result = await getDocs(q);
    const profile = result.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    setProfiles(profile);
    // return profile;
  }
  useEffect(() => {
    if (userId) {
      getSuggestedProfiles(userId, following);
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={100} />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col mt-5">
      <h3 className="font-semibold text-gray-400 mx-3">Suggestions For You</h3>
      <div className="mt-4 mb-3 grid gap-4 ml-1">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocid={loggedInUserDocid}
          />
        ))}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  username: propTypes.string,
  profileId: propTypes.string,
  userId: propTypes.string,
  loggedInUserDocid: propTypes.string,
  following: propTypes.array,
};

export default Suggestions;
