import { firebase, FieldValue } from "../lib/firebase";

export const doesUsernameExist = async (username) => {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  return res.docs.length > 0;
};

export const getUserById = async (userId) => {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = res.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

export const getSuggestedUsers = async (userId, following) => {
  const res = await firebase.firestore().collection("users").limit(10).get();

  const users = res.docs
    .map((item) => ({
      ...item.data(),
      docId: item.id,
    }))
    .filter(
      (user) => user.userId !== userId && !following.includes(user.userId)
    );

  return users;
};

export const updateLoggedUserFollowing = async (
  userDocId,
  profileId,
  isFollowing
) => {
  try {
    // const currentUser = await firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(userDocId)
    //   .get();

    // const userFollowingArray = currentUser.data().following;
    // userFollowingArray.push(profileId);

    await firebase
      .firestore()
      .collection("users")
      .doc(userDocId)
      .update({
        following: isFollowing
          ? FieldValue.arrayRemove(profileId)
          : FieldValue.arrayUnion(profileId),
      });
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

export const updateFollowedUserFollowers = async (
  profileDocId,
  userId,
  isFollowing
) => {
  try {
    // const profileUser = await firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(profileDocId)
    //   .get();

    // const profileFollowersArray = profileUser.data().followers;
    // profileFollowersArray.push(userId);

    await firebase
      .firestore()
      .collection("users")
      .doc(profileDocId)
      .update({
        followers: isFollowing
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

export const getUserPhotos = async (userId, following) => {
  const res = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();
  const photos = res.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  const photosWithUserDetails = await Promise.all(
    photos.map(async (photo) => {
      let likedPhoto = false;
      if (photo.likes.includes(userId)) {
        likedPhoto = true;
      }

      const user = await getUserById(photo.userId);

      const { username } = user[0];

      return { likedPhoto, ...photo, username };
    })
  );

  console.log(`photosWithUserDetails`, photosWithUserDetails)
  console.log(`userId`, userId)

  return photosWithUserDetails;
};
