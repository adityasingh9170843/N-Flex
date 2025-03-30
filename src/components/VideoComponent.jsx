import React from "react";
import propTypes from "prop-types";
function VideoComponent({ id, small }) {
  return (
    <iframe
      width={"100%"}
      height={small ? 150 : 500}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allowFullScreen
    ></iframe>
  );
}

VideoComponent.prototype = {
  id: propTypes.string,
  small: propTypes.bool,
};

export default VideoComponent;
