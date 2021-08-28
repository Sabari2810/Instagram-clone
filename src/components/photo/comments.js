import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";

const Comments = ({ docId, comments: allComments, commentInput, posted }) => {
  const [comments, setComments] = useState(allComments);

  return (
    <>
      <div className="p-4 pt-1">
        {comments.length >= 3 && (
          <Link>
            <p>view all {comments.length} comments</p>
          </Link>
        )}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`}>
            <Link to={`/p/${item.displayName}`}>
              <span className="font-bold mr-3">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="mt-2 text-gray-base text-xs uppercase">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment commentInput={commentInput} docId={docId} comments={comments} setComments={setComments} />
    </>
  );
};

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  commentInput: PropTypes.object.isRequired,
  posted: PropTypes.number.isRequired,
};

export default Comments;
