import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const Photos = ({ photos }) => {
  return (
    <div className="border-t border-gray-primary mt-10 mb-8">
      <div className="grid grid-cols-3 gap-4 mt-12">
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => {
            return (
              <div key={photo.docId} className="relative group">
                <img src={photo.imageSrc} alt={photo.caption} />
                <div className="absolute group-hover:flex items-center w-full h-full hidden bottom-0 left-0 bg-black-faded justify-evenly">
                  <p className="flex text-white font-bold items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 fill-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {photo.likes.length}
                  </p>
                  <p className="flex text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 fill-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {photo.comments.length}
                  </p>
                </div>
              </div>
            );
          })
        ) : null}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl"> No Posts yet</p>
        ))}
    </div>
  );
};

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
