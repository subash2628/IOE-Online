import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";

const EachTopic = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Button>
            <ArrowBackIcon
              fontSize="large"
              onClick={() => console.log("Back")}
            />
          </Button>
        </div>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <div
          className="col"
          style={{ backgroundColor: "red", textAlign: "center" }}
        >
          <h2>subash sharma subedi</h2>
        </div>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <div className="col-12">
          {
            "asjdhfjkahskdhaskjdfhaklsdhfkajsdhfkajsdhfkjashdfkljasdhfkjashdfjkashdfkjashdfkjhasdfhaksdhfkjasdfkasjdhfkjasdhfjkashdfkasjhdfkasjdhfaksjdhfkasjh"
          }
        </div>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <div className="col-12">
          <a href="https://www.google.com">Link here...</a>
        </div>
      </div>
      <div className="row" style={{ marginTop: 40 }}>
        <div className="col-1">
          <Button>
            <FavoriteBorderIcon fontSize="large" />
          </Button>
        </div>
        <div className="col-1">
          <Button>
            <ShareIcon fontSize="large" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EachTopic;
