import { nanoid } from "nanoid";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import Comment from "../Comment/Comment";
import PhotoModal from "../PhotoModal/PhotoModal";
import TextArea from "../TextArea/TextArea";
import UserBadge from "../UserBadge/UserBadge";
import "./styles.scss";

const DetailedCard = ({
  userName,
  userId,
  avatarUrl,
  imgUrl,
  likes,
  isLikeByYou,
  comments,
  onLikeClick,
  id,
  onCommentSendClick,
  mutateLoading,
}) => {
  const [isCommentsShow, setIsCommentsShow] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(id, comment);
      setComment("");
    }
  };

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

  const onOpenModal = () => {
    setComment("");
    setIsModalVisible(true);
  };

  const onCloseModal = () => {
    setComment("");
    setIsModalVisible(false);
  };

  return (
    <div className={"cnDetailedCardRoot cnMainPageCard"}>
      <div className="cnDetailedCardHeader">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div className="cnDetailedCardImgWrapper">
        {!isImageLoaded && <div className="cnImageLoader"> <Bars color="#FF0000" width={15} height={15} /></div>}
        <img
          src={imgUrl}
          alt="img"
          className={`${isImageLoaded ? "cnDetailedCardImgLoaded" : ""} cnDetailedCardImg`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="cnDetailedCardButtons">
        <i onClick={() => onLikeClick(id)} className={`${isLikeByYou ? "fas" : "far"} fa-heart cnDetailedLikeIcon`} />
        <i className="far fa-comment cnDetailedLikeComment" onClick={onOpenModal} />
      </div>
      <div className="cnDetailedCardLikes">{`Like ${likes} people`}</div>
      <div className="cnDetailedCardComments">{renderComments()}</div>
      <TextArea
        className="cnDetailedCardButtons"
        value={comment}
        onChange={setComment}
        placeholder="Add a comment..."
        isLoading={mutateLoading}
        onSubmit={handleSendCommentClick}
        buttonText="Send"
      />
      <PhotoModal
        comments={comments}
        isOpen={isModalVisible}
        onClose={onCloseModal}
        userName={userName}
        avatarUrl={avatarUrl}
        userId={userId}
        commentValue={comment}
        setCommentValue={setComment}
        onCommentSubmit={handleSendCommentClick}
        isCommentLoading={mutateLoading}
        imgUrl={imgUrl}
        isLikeByYou={isLikeByYou}
        onLikeClick={() => onLikeClick(id)}
      />
    </div>
  );
};

export default DetailedCard;
