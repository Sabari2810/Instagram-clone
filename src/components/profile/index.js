import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { getUserPhotosByUserId } from "../../services/firebase";
import Header from "./header";
import Photos from "./photos";

const reducer = (state, newState) => ({ ...state, ...newState });

const initialState = {
  photos: [],
  profile: {},
  followercount: 0,
};

const UserProfile = ({ user }) => {
  const [{ photos, profile, followercount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    const getUserInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        photos: photos,
        profile: user,
        followercount: user.followers.length,
      });
    };

    if (user?.userId) {
      getUserInfoAndPhotos();
    }
  }, [user]);

  return profile?.username ? (
    <>
      <Header
        profile={profile}
        photos={photos}
        followercount={followercount > 0 ? followercount : 0}
        setFollowercount={dispatch}
      />
      <Photos photos={photos} />
    </>
  ) : null;
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    dateCreated: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    following: PropTypes.array.isRequired,
    followers: PropTypes.array.isRequired,
  }),
};

export default UserProfile;
