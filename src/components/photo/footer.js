import PropTypes from "prop-types";

const Footer = ({ username, caption }) => {
  return (
    <div className="p-4">
      <span className="font-bold mr-2">{username}</span>
      <span>{caption}</span>
    </div>
  );
};

Footer.propTypes = {
  username: PropTypes.string,
  caption: PropTypes.string,
};

export default Footer;
