import { React, useContext } from "react";
import loggedInUserContext from "../context/logged-in-user";
import usePhotos from "../hooks/use-photos";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Post from "./post/index";

function Timeline() {
  const { userObj } = useContext(loggedInUserContext);
  // const { userObj: following = {} } = useContext(loggedInUserContext);
  const { photos } = usePhotos(userObj);
  // console.log(foundUser);

  return (
    <div className="container items-center mx-auto col-span-2 mt-6 w-5/6">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <div>
          <p>Follow people to see posts!</p>
        </div>
      )}
    </div>
  );
}

export default Timeline;
