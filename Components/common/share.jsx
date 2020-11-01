import React from "react";

import { CgShare } from "react-icons/cg";

export default ({ link, toogleSnackbar }) => {
  const copyTextToClipboard = () => {
    const dummy = document.createElement("input");

    document.body.appendChild(dummy);
    dummy.value = link;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    toogleSnackbar();
  };
  return (
    <CgShare
      size={25}
      style={{ cursor: "pointer" }}
      onClick={copyTextToClipboard}
    />
  );
};
