import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Photo from "./photo";

const Timeline = () => {
  const { photos } = usePhotos();
  // console.log(`photos`, photos)
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} height={500} width={640} className="mb-4" />
      ) : (
        photos.map((item) => <Photo key={item.docId} content={item} />)
      )}

      {/* {!photos || (photos.length === 0 && <p>follow people to see photos</p>)} */}
    </div>
  );
};

export default Timeline;
