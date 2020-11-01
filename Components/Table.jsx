import React, { useState } from "react";
//import EachTopic from "./common/EachTopic";
//import Link from "@material-ui/core/Link";
import Like from "./common/like";
import Share from "./common/share";
import "../App.css";
import { paginate } from "../utils/paginate";
import { putLike, deleteLike, putView } from "../utils/localStorage";
import { giveLikedItems, giveViewedItems } from "../utils/localStorage";

import * as firebase from "firebase/app";
import "firebase/firestore";

export default ({ catagory, toogleSnackbar, currentPage, pageSize }) => {
  const [likes, setLikes] = useState(giveLikedItems());
  const [views, setViews] = useState(giveViewedItems());
  //console.log("likes ", likes);

  const paginatedData = paginate(catagory.data, currentPage, pageSize);

  const cloudUpdateLike = async (step, id) => {
    const docRef = firebase.firestore().collection(catagory.name).doc(id);
    const currentLikes = await docRef.get();
    if (currentLikes.data().Likes <= 0 && step === -1) return;
    else {
      await docRef.update({
        Likes: firebase.firestore.FieldValue.increment(step),
      });
    }
  };

  const cloudUpdateView = async (id) => {
    const docRef = firebase.firestore().collection(catagory.name).doc(id);
    await docRef.update({
      Views: firebase.firestore.FieldValue.increment(1),
    });
  };

  const toggleLike = (liked, id) => {
    if (liked) {
      const filteredLikes = likes.filter((like) => like !== id);
      setLikes(filteredLikes);
      deleteLike(id);
      cloudUpdateLike(-1, id);
    } else {
      const filteredLikes = [...likes, id];
      //console.log(filteredLikes);
      setLikes(filteredLikes);
      putLike(id);
      cloudUpdateLike(1, id);
    }
  };

  const checkViews = (id) => {
    const viewed = views.includes(id);
    if (viewed) return;
    else {
      const filteredViews = [...views, id];
      setViews(filteredViews);
      putView(id);
      cloudUpdateView(id);
    }
  };

  return (
    <div className="table-responsive mt-4">
      <h5 className="text-info ">
        Showing {paginatedData.length} datas in the list.
      </h5>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>

            <th scope="col">Likes</th>
            <th scope="col">Like</th>
            <th scope="col">Share</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((data, index) => (
            <tr key={index}>
              <th
                scope="row"
                //onClick={() => window.open(data.Link, "_blank")}
                style={{ cursor: "pointer" }}
              >
                <a
                  //className="text-black-10"
                  style={{
                    fontFamily: "Rubik",
                    fontSize: 20,
                    fontWeight: "normal",
                    color: "black",
                  }}
                  href={data.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => checkViews(data._id)} //increase Views
                >
                  {data.Title}
                </a>
              </th>

              <td>
                {data.Likes && data.Views
                  ? Math.floor((data.Likes / data.Views) * 100)
                  : "0"}
                %
              </td>
              <td>
                <Like
                  liked={likes.includes(data._id)}
                  onClick={toggleLike}
                  id={data._id}
                />
              </td>
              <td>
                <Share
                  link={"https://www.google.com"}
                  toogleSnackbar={toogleSnackbar}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
