import React from "react";

export default ({ height }) => {
  return (
    <div
      className="d-flex mt-4 flex-column"
      //style={{ height: 400 }}
    >
      <h1 className="text-center text-info" style={{ fontFamily: "Quicksand" }}>
        Helping you cross the Bridge !
      </h1>
      <img
        src="featured.jpg"
        width="100%"
        height={height}
        className="d-inline-block align-top mb-5"
        alt=""
        loading="lazy"
      />
    </div>
  );
};
