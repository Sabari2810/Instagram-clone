import PropTypes from 'prop-types';

const Image = ({ src, caption }) => {
    return <img src={src} alt={caption}></img>
};


Image.propTypes = {
    src : PropTypes.string,
    caption : PropTypes.string
}

export default Image;
