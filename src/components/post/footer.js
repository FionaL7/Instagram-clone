import React from "react";
import propTypes from "prop-types";

export default function Footer({ username, caption }) {
  return (
    <div className="p-4 pt-2 pb-1">
      <span className="font-bold pr-2">{username}</span>
      <span className="italic">{caption}</span>
    </div>
  );
}
Footer.propTypes = {
  caption: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
};
