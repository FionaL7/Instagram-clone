import { useState } from "react";
import propTypes from "prop-types";
import { UserAuth } from "../../context/AuthContext";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../../libraries/firebase";

export default function AddComment({ docId, comments, commentInput }) {
  const [comment, setComment] = useState("");
  const {
    user: { displayName },
  } = UserAuth();

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setComment([...comments, { displayName, comment }]);
    setComment("");
    const docRef = await doc(db, "photos", docId);
    let updatedComments = await updateDoc(docRef, {
      comments: arrayUnion({ displayName, comment }),
    });
    return updatedComments;
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          type="text"
          aria-label="Add a comment"
          placeholder="Add a comment..."
          autoComplete="off"
          value={comment}
          className="text-sm text-gray-base focus:outline-0 w-full mr-3 py-4 px-4"
          onChange={(e) => setComment(e.target.value)}
          ref={commentInput}
        />
        <button
          type="button"
          className={`font-semibold text-btnBlue ${!comment && "opacity-25"}`}
          onClick={handleSubmitComment}
          //   disabled={comment.length > 1}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: propTypes.string.isRequired,
  comments: propTypes.array.isRequired,
  commentInput: propTypes.object,
};
