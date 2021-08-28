import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Photo from "./photo";

const Timeline = () => {
  const { photos } = usePhotos();
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} height={500} width={640} className="mb-4" />
      ) : photos?.length > 0 ? (
        photos.map((item) => {
          return <Photo key={item.docId} content={item} />
        })
      ) : (
        <p>follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
