import { useState, useEffect } from "react";
import { getUserPhotos } from "../services/firebase";
import useUser from "./use-user";

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const {
    user: { following, userId },
  } = useUser();

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const followeduserphotos = await getUserPhotos(userId, following);
      // console.log(`followeduserphotos`, followeduserphotos);
      followeduserphotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followeduserphotos);
    };

    if (following?.length > 0) {
      getTimelinePhotos();
    }
    else{
      setPhotos([])
    }
  }, [following, userId]);

  // console.log(`followeduserphotos`, photos);
  return { photos };
};

export default usePhotos;
