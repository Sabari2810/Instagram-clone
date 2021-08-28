import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateFollowedUserFollowers,
  updateLoggedUserFollowing,
} from "../../services/firebase";

const SuggestedProfile = ({
  username,
  profileId,
  userId,
  profileDocId,
  userDocId,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollow = async () => {
    setFollowed(true);
    await updateLoggedUserFollowing(userDocId, profileId, false);

    await updateFollowedUserFollowers(profileDocId, userId, false);
  };

  return !followed ? (
    <div className="flex flex-row justify-between">
      <div className="flex justify-between">
        <img
          src={`/images/avatars/${username}.jpg`}
          className="rounded-full w-8 mr-3"
          alt=""
        ></img>
        <Link to={`/p/${username}`}>
          <p>{username}</p>
        </Link>
      </div>
      <button
        onClick={handleFollow}
        className="text-sm font-bold text-blue-medium"
      >
        Follow
      </button>
    </div>
  ) : null;
};

SuggestedProfile.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
  userDocId: PropTypes.string,
  profileId: PropTypes.string,
};

export default SuggestedProfile;
