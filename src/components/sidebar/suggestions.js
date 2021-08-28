import { useState, useEffect } from "react";
import { getSuggestedUsers } from "../../services/firebase";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./suggestedprofile";

const Suggestions = ({ userId, following, userDocId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const suggestedProfiles = async () => {
      const res = await getSuggestedUsers(userId, following);
      setProfiles(res);
    };
    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);
  return !profiles ? (
    <Skeleton height={150} count={1} />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestion for you</p>
      </div>
      <div className="grid gap-5 mt-4">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            username={profile.username}
            profileDocId={profile.docId}
            profileId={profile.userId}
            userId={userId}
            userDocId={userDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

Suggestions.propTypes = {
  following: PropTypes.array,
  userId: PropTypes.string,
  userDocId: PropTypes.string,
};

export default Suggestions;
