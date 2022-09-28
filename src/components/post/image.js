import React from "react";
import propTypes from "prop-types";

export default function Image({ src, caption }) {
  return (
    <img
      src={src}
      alt={caption}
      className="flex justify-center mx-auto pb-0 max-h-fit"
    />
  );
}

Image.propTypes = {
  src: propTypes.string,
  caption: propTypes.string,
};
