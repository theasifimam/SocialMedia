import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { UilHeart } from "@iconscout/react-unicons";
import { likePost } from "../../api/postRequest";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    setLiked((pre) => !pre);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  return (
    <div className="Post">
      <div className="detail">
        <span
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            textTransform: "capitalize",
          }}
        >
          {user.firstname} {user.lastname} <br></br>
        </span>
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>

      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        {/* {liked ? <FontAwesomeIcon icon="fa-solid fa-heart" /> : <UilHeart />} */}
        <img src={Comment} alt="" style={{ cursor: "pointer" }} />
        <img src={Share} alt="" style={{ cursor: "pointer" }} />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "16px" }}>
        {likes} likes
      </span>
    </div>
  );
};

export default Post;
