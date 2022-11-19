import { nanoid } from "nanoid";
import { useState } from "react";
import Comment from "../Comment/Comment";
import UserBadge from "../UserBadge/UserBadge";
import "./styles.scss";

const DetailedCard = ({
  userName,
  userId,
  avatarUrl,
  imgUrl,
  likes,
  isLikedByYou,
  comments,
  onLikeClick,
  id,
  onCommentSendClick,
  mutateLoading,
}) => {
  const [isCommentsShow, setIsCommentsShow] = useState(false);
  const [comment, setComment] = useState("");

  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(id, comment);
      setComment('');
    }
  }

  const renderComments = () => {
    if (comments.length > 2 && !isCommentsShow) {
      const commentsCopy = [...comments];
      const commentForRender = commentsCopy.splice(comments.length - 2, 2);

      return (
        <>
          <span className="cnDetailedCardLikeCommentTitle" onClick={() => setIsCommentsShow(true)}>{`View all ${
            comments.length - commentForRender.length
          } comments`}</span>
          {commentForRender.map((comment) => (
            <Comment {...comment} key={nanoid()} />
          ))}
        </>
      );
    }
    return comments.map((comment) => <Comment {...comment} key={nanoid()} />);
  };

  return (
    <div className={"cnDetailedCardRoot cnMainPageCard"}>
      <div className="cnDetailedCardHeader">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div>
        <img src={imgUrl} alt="img" className="cnDetailedCardImg" />
      </div>
      <div className="cnDetailedCardButtons">
        <i onClick={() => onLikeClick(id)} className={`${isLikedByYou ? "fas" : "far"} fa-heart cnDetailedLikeIcon`} />
        <i className="far fa-comment cnDetailedLikeComment" />
      </div>
      <div className="cnDetailedCardLikes">{`Like ${likes} people`}</div>
      <div className="cnDetailedCardComments">{renderComments()}</div>
      <div className="cnDetailedCardTextAreaWrapper">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="cnDetailedCardTextArea"
        />
        <button disabled={mutateLoading} onClick={handleSendCommentClick} className="cnDetailedCardSendButton">Post</button>
      </div>
    </div>
  );
};

export default DetailedCard;
