import PropTypes from "prop-types";
import Header from "./header";
import Image from "./image";
import Action from "./action";
import { useRef } from "react";
import Footer from "./footer";
import Comments from "./comments";

const Photo = ({ content }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="bg-white rounded border border-gray-primary mb-8">
      <Header username={content.username} />
      <Image src={content.imageSrc} capton={content.caption} />
      <Action
        docId={content.docId}
        userId={content.userId}
        totalLikes={content.likes.length}
        likedPhoto={content.likedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        commentInput={commentInput}
        posted={content.dateCreated}
      />
    </div>
  );
};

Photo.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
    caption: PropTypes.string,
    comments: PropTypes.array,
    likes: PropTypes.array,
    likedPhoto: PropTypes.bool,
  }),
};

export default Photo;
