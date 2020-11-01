//import React from "react";

export const checkLocal = (_) => {
  const local = localStorage.getItem("local");
  //console.log("first ", JSON.parse(local));
  if (!local) {
    createLocal();
    return false;
  }

  return true;
};
export const createLocal = (_) => {
  const local = { Likes: [], Views: [] };
  console.log("created ", local);
  localStorage.setItem("local", JSON.stringify(local));
};

export const checkLike = (id) => {
  console.log("id ", id);
  const local = JSON.parse(localStorage.getItem("local"));
  console.log("current Local storage ", local);
  const includes = local.Likes.includes(id);
  if (!includes) return false;
  return true;
};
export const checkView = (id) => {
  const local = localStorage.getItem("local");
  const includes = local.Views.includes(id);
  if (!includes) return false;
  return true;
};

export const putLike = (id) => {
  const local = JSON.parse(localStorage.getItem("local"));
  local.Likes.push(id);
  localStorage.setItem("local", JSON.stringify(local));
};
export const putView = (id) => {
  const local = JSON.parse(localStorage.getItem("local"));
  local.Views.push(id);
  localStorage.setItem("local", JSON.stringify(local));
};
export const deleteLike = (id) => {
  const local = JSON.parse(localStorage.getItem("local"));
  const includes = local.Likes.includes(id);
  if (!includes) return;
  const newLikes = local.Likes.filter((like) => id !== like);
  local.Likes = newLikes;
  localStorage.setItem("local", JSON.stringify(local));
};
// export const deleteView = (id) => {
//   const local = JSON.parse(localStorage.getItem("local"));
//   const includes = local.Views.includes(id);
//   if (!includes) return;
//   const newViews = local.Views.filter((like) => id !== like);
//   local.Views = newViews;
//   localStorage.setItem("local", JSON.stringify(local));
// };

export const emptyLocalStorage = (_) => {
  localStorage.setItem("local", null);
};

export const giveLikedItems = (_) => {
  return JSON.parse(localStorage.getItem("local")).Likes;
};
export const giveViewedItems = (_) => {
  return JSON.parse(localStorage.getItem("local")).Views;
};
