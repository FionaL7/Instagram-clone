import { useState } from "react";
import propTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p className="text-sm text-gray-400 mb-1 cursor-pointer">
            View comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment} - ${item.displayName}`}>
            <Link to={`/profile/${item.displayName}`} className="mb-1">
              <span className="font-semibold mr-2">{item.displayName}</span>
            </Link>
            <span className="text-sm">{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-400 uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: propTypes.string.isRequired,
  comments: propTypes.array.isRequired,
  posted: propTypes.number.isRequired,
  commentInput: propTypes.object.isRequired,
};
