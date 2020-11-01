import React from "react";
import PropTypes from "prop-types";

const dropdowns = (props) => {
  const { Catagories, onCatagoryChange, currentCatagory } = props;
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {currentCatagory !== null ? Catagories[currentCatagory].name : "Choose"}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a
          key={0}
          className="dropdown-item"
          onClick={() => onCatagoryChange(null)}
          //href="#"
        >
          None
        </a>
        {Catagories.map((catagory, index) => (
          <a
            key={index}
            className="dropdown-item"
            onClick={() => onCatagoryChange(index)}
            //className="d-flex justify-content-between"
          >
            {catagory.name}
            <span className="badge badge-primary badge-pill ml-2">
              {catagory.data.length}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

dropdowns.propTypes = {
  Catagories: PropTypes.array.isRequired,
  onCatagoryChange: PropTypes.func.isRequired,
  currentCatagory: PropTypes.any,
};
export default dropdowns;
