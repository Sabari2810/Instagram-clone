import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const User = ({ username, fullname }) =>
  !username || !fullname ? (
    <Skeleton height={61} count={1} />
  ) : (
    <Link to={`/p/${username}`} className="grid grid-cols-4 justify-between mb-4 items-center gap-4">
        <div className="col-span-1">
            <img src={`/images/avatars/${username}.jpg`} alt={`${username}`} className="rounded-full w-16"></img>
        </div>
        <div className="col-span-3">
            <p className="font-bold text-sm">{username}</p>
            <p className="text-sm">{fullname}</p>
        </div>
    </Link>
  );

export default User;

User.propTypes = {
  fullname: PropTypes.string,
  username: PropTypes.string,
};
