import PropTypes from "prop-types";
import { useState, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import useUser from "../../hooks/use-user";

const AddComment = ({ comments, setComments, commentInput, docId }) => {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { username },
  } = useUser();

  const handleCommentPost = async (event) => {
    event.preventDefault();
    setComments([{ displayName: username, comment }, ...comments]);
    setComment("")

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({
          comment,
          displayName: username,
        }),
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        method="POST"
        onSubmit={handleCommentPost}
        className="flex justify-between"
      >
        <input
          type="text"
          ref={commentInput}
          className="w-full p-4"
          value={comment}
          placeholder="Add a comment..."
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button
          className={`px-4 font-bold text-blue-medium ${
            !comment && `opacity-25`
          }`}
          disabled={comments.length <= 1}
          // onClick={handleCommentPost}
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

AddComment.propTypes = {
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
  docId: PropTypes.string.isRequired,
};

export default AddComment;
