import { nanoid } from "nanoid";
import { useState } from "react";
import Comment from "../Comment/Comment";
import UserBadge from "../UserBadge/UserBadge";
import "./styles.scss";

const DetailedCard = ({
  userName,
  avatarUrl,
  id,
  imgUrl,
  likes,
  isLikedByYou,
  comments,
}) => {
  const [isCommentsShow, setIsCommentsShow] = useState(false);

  const renderComments = () => {
    if (comments.length > 2 && !isCommentsShow) {
      const commentsCopy = [...comments];
      const commentForRender = commentsCopy.splice(comments.length - 2, 2);

      return (
        <>
        <span className="cnDetailedCardLikeCommentTitle" onClick={() => setIsCommentsShow(true)}>{`View all ${comments.length - commentForRender.length} comments`}</span>
        {commentForRender.map((comment) => <Comment {...comment} key={nanoid()} />)}
        </>
      )
    }
    return comments.map((comment) => <Comment {...comment} key={nanoid()} />)
  }

  return (
    <div className={"cnDetailedCardRoot cnMainPageCard"}>
      <div className="cnDetailedCardHeader">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={id} />
      </div>
      <div>
        <img src={imgUrl} alt="img" className="cnDetailedCardImg" />
      </div>
      <div className="cnDetailedCardButtons">
        <i className={`${isLikedByYou ? 'fas' : 'far'} fa-heart cnDetailedLikeIcon`} />
        <i className="fas fa-comment cnDetailedLikeComment" />
      </div>
      <div className="cnDetailedCardLikes">
        {`Like ${likes} people`}
      </div>
      <div className="cnDetailedCardComments">
        {renderComments()}
      </div>
      <textarea className="cnDetailedCardTextArea" />
    </div>
  );
};

export default DetailedCard;
