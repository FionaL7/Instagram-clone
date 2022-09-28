import { useReducer, useEffect } from "react";
import propTypes from "prop-types";
import Header from "./header";
import Photo from "./photo";
import Footer from "./footer";
import { getUserPhotosByUserId } from "../../services/firebase";

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId || user.uid);
      // console.log("photos", photos);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers?.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        user={user}
      />
      <Photo photos={photosCollection} />
      <Footer />
    </>
  );
}

UserProfile.propTypes = {
  user: propTypes.shape({
    dateCreated: propTypes.number,
    emailAddress: propTypes.string,
    followers: propTypes.array,
    following: propTypes.array,
    fullName: propTypes.string,
    userId: propTypes.string,
    uid: propTypes.string,
    username: propTypes.string,
  }),
};
