import {
  where,
  query,
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
// import { FieldValue } from "firebase/firestore";
import { db } from "../libraries/firebase";

export async function doesUsernameExist(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const queryDocs = await getDocs(q);
  return queryDocs.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username.toLowerCase())
  );
  const queryDocs = await getDocs(q);
  const user = queryDocs.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user.length > 0 ? user : false;
}

export async function getUserByUserId(userId) {
  try {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    // const result = querySnapshot.docs[0].data();
    const result = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    return result[0];
  } catch (e) {
    console.log(e.message);
  }
}

export async function updateFollowingList(
  loggedInUserDocid,
  profileId,
  isFollowingProfile
) {
  const docRef = doc(db, "users", loggedInUserDocid);
  let result;
  if (!isFollowingProfile) {
    result = await updateDoc(docRef, {
      following: arrayUnion(profileId),
    });
  } else {
    result = await updateDoc(docRef, {
      following: arrayRemove(profileId),
    });
  }

  return result;
}

export async function updateFollowedUserFollowers(
  profileId,
  loggedInUserId,
  isFollowingProfile
) {
  const docRef = doc(db, "users", profileId);
  let result;
  if (!isFollowingProfile) {
    result = await updateDoc(docRef, {
      followers: arrayUnion(loggedInUserId),
    });
  } else {
    result = await updateDoc(docRef, {
      followers: arrayRemove(loggedInUserId),
    });
  }

  return result;
}

export async function getPhotos(user, userId, following) {
  const q = query(collection(db, "photos"), where("userId", "in", following));
  const qSnapShot = await getDocs(q);
  const userFollowedPhotos = qSnapShot.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  // console.log("users followed photo data", userFollowedPhotos);
  const photoWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhotos = false;
      if (photo.likes.includes(userId)) {
        userLikedPhotos = true;
      }
      // console.log("user liked photo", userLikedPhotos);
      const loggedInUser = await getUserByUserId(userFollowedPhotos[0].userId);
      // console.log(loggedInUser);
      const { username } = loggedInUser;
      return { username, ...photo, userLikedPhotos };
    })
  );
  // console.log(photoWithUserDetails);
  return photoWithUserDetails;
}

export async function getUserPhotosByUserId(userId) {
  const q = query(collection(db, "photos"), where("userId", "==", userId));
  const queryDocs = await getDocs(q);
  const result = queryDocs.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return result;
}

export async function isUserFollowingProfile(loggedInUserUsername, profileId) {
  const q = query(
    collection(db, "users"),
    where("username", "==", loggedInUserUsername),
    where("following", "array-contains", profileId)
  );
  const querySnapshot = await getDocs(q);
  const [response = {}] = querySnapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.uid;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateFollowingList(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}
