import { useState, useEffect } from "react";

import { getPhotos } from "../services/firebase";

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);
  // let userId = user.uid;
  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(
          user,
          user?.uid,
          user.following
        );
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
    // photos.map((p) => {
    //   console.log(p);
    // });
  }, [user?.uid, user?.following]);
  return { photos };
}
