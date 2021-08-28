import PropTypes from "prop-types";
import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import useUser from "../../hooks/use-user";

const Action = ({ totalLikes, docId, userId, likedPhoto, handleFocus }) => {
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [likes, setLikes] = useState(totalLikes);
  const {
    user: { userId: activeUserId },
  } = useUser();

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);
    setLikes((likes) => (!toggleLiked ? likes + 1 : likes - 1));

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: !toggleLiked
          ? FieldValue.arrayUnion(activeUserId)
          : FieldValue.arrayRemove(activeUserId),
      });
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`cursor-pointer select-none mr-3 h-8 w-8 ${
              toggleLiked ? `fill-red text-red-primary` : `text-black-primary`
            }`}
            onClick={handleToggleLiked}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleFocus();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-black-light cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
      <div className="py-0 p-4">
        <p className="font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
};

Action.propTypes = {
  totalLikes: PropTypes.number,
  docId: PropTypes.string,
  userId: PropTypes.string,
  likedPhoto: PropTypes.bool,
  handleFocus: PropTypes.func,
};

export default Action;
