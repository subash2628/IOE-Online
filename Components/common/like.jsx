import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import PropTypes from "prop-types";
//import {putLike} from '../../utils/localStorage';

//props => liked , onClick
const Like = ({ liked, onClick, id }) => {
  if (!liked)
    return (
      <BsHeart
        size={25}
        onClick={() => onClick(liked, id)}
        style={{ cursor: "pointer" }}
      />
    );
  return (
    <BsHeartFill
      size={25}
      onClick={() => onClick(liked, id)}
      style={{ cursor: "pointer" }}
    />
  );
};

Like.propTypes = {
  liked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Like;
