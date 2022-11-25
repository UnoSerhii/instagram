import { useState } from "react";
import PhotoModal from "../PhotoModal/PhotoModal";
import "./styles.scss";

const Card = ({ imgUrl, likes, comments, isLikeByYou, onLikeClick, onCommentSubmit, id, userData, isMutateLoading }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div className="cnCardRoot">
      <img src={imgUrl} alt={imgUrl} className="cnCardImage" />
      <div className="cnCardHover" />
      <div className="onCardIcons">
        <i className={`${isLikeByYou ? "fas" : "far"} fa-heart cnCardIcon`} onClick={onLikeClick} />
        <span className="cnCardNumber cnCardLikes">{likes}</span>
        <i className="fas fa-comment cnCardIcon" onClick={() => setModalVisible(true)} />
        <span className="cnCardNumber">{comments.length}</span>
      </div>
      <PhotoModal
        comments={comments}
        isOpen={isModalVisible}
        onClose={() => setModalVisible(false)}
        {...userData}
        commentValue={comment}
        setCommentValue={setComment}
        onCommentSubmit={() => onCommentSubmit(comment)}
        isCommentLoading={isMutateLoading}
        imgUrl={imgUrl}
        isLikedByYou={isLikeByYou}
        onLikeClick={() => onLikeClick(id)}
      />
    </div>
  );
};

export default Card;
