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

export const getUserByUsername = async (username) => {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
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
  console.log(`res`, res);
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

  return photosWithUserDetails;
};

export const getUserPhotosByUserId = async (userId) => {
  const res = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();
  return res.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
};

export const isUserFollowingProfile = async (userId, profileId) => {
  var res = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .where("following", "array-contains", profileId)
    .get();
  var [data = {}] = res.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return data?.username;
};
