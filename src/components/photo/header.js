import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ username }) => {
  return (
    <div className="flex border-b border-gray-primary py-8 p-4 h-4">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            src={`/images/avatars/${username}.jpg`}
            alt={`${username}`}
            className="rounded-full h-8 w-8 mr-6"
          ></img>
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string,
};

export default Header;
