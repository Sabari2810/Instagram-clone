import useUser from "../../hooks/use-user";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  isUserFollowingProfile,
  updateFollowedUserFollowers,
  updateLoggedUserFollowing,
} from "../../services/firebase";
import Skeleton from "react-loading-skeleton";

const Header = ({ profile, followercount, setFollowercount, photos }) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeFollowButton = user.username !== profile.username;

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.userId,
        profile.userId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user.userId && profile.userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.userId, profile.userId]);

  const handleToggleFollowers = async () => {
    // console.log(`before`, isFollowingProfile);
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    // console.log(`after`, isFollowingProfile);
    setFollowercount({
      followercount: isFollowingProfile ? followercount - 1 : followercount + 1,
    });

    await updateLoggedUserFollowing(
      user.docId,
      profile.userId,
      isFollowingProfile
    );
    await updateFollowedUserFollowers(
      profile.docId,
      user.userId,
      isFollowingProfile
    );
  };

  return (
    <div className="grid grid-cols-3 mx-auto gap-4 justify-between max-width-screen-lg">
      <div className="container flex justify-center">
        {!user.username ? (
          <>
            <Skeleton count={10} h={100} w={80} />
          </>
        ) : (
          <img
            className="h-40 w-40 rounded-full flex"
            src={`/images/avatars/${profile.username}.jpg`}
            alt={`${profile.username}`}
          />
        )}
      </div>
      <div className="col-span-2 flex flex-col justify-center">
        <div className="container flex items-center">
          <p className="text-2xl mr-3">{profile.username}</p>
          {activeFollowButton && (
            <button
              onClick={handleToggleFollowers}
              className="text-white font-bold rounded bg-blue-medium w-24 h-8"
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="flex container mt-3">
          {profile.following === undefined ||
          profile.followers === undefined ? (
            <></>
          ) : (
            <>
              <p className="mr-8">
                <span className="font-bold">{photos.length}</span> posts
              </p>
              <p className="mr-8">
                <span className="font-bold">{followercount}</span> followers
              </p>
              <p className="mr-8">
                <span className="font-bold">{profile.following.length}</span>{" "}
                following
              </p>
            </>
          )}
        </div>
        <div className="mt-3 container">
          <p className="font-bold">{profile.fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }),
  followercount: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
};
