import { nanoid } from "nanoid";
import { useEffect } from "react";
import Modal from "react-modal";
import Comment from "../Comment/Comment";
import TextArea from "../TextArea/TextArea";
import UserBadge from "../UserBadge/UserBadge";
import "./styles.scss";

const PhotoModal = ({
  commentValue,
  setCommentValue,
  onCommentSubmit,
  isCommentLoading,
  isOpen,
  onClose,
  imgUrl,
  userName,
  avatarUrl,
  userId,
  comments,
  isLikeByYou,
  onLikeClick,
}) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.classList.add("cnBodyOverflow");
    } else {
      body.classList.remove("cnBodyOverflow");
    }
  }, [isOpen]);
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="cnModal"
      overlayClassName="cnModalOverlay"
      ariaHideApp={false}
    >
      <div className="cnPhotoModalRoot">
        <div className="cnModalPhotoWrapper">
          <img src={imgUrl} alt={imgUrl} className="cnModalImg" />
        </div>
        <div className="cnModalCommentsBlock">
          <div className="cnModalHeader">
            <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
          </div>
          <div className="cnModalComments">
            {comments.map((comment) => (
              <Comment {...comment} key={nanoid()} />
            ))}
          </div>
          <div>
            <div className="cnModalIcons">
              <i onClick={onLikeClick} className={`${isLikeByYou ? 'fa' : 'far'} fa-heart cnModalLikeIcon`} />
            </div>
            <TextArea
            value={commentValue}
            onChange={setCommentValue}
            placeholder="Add a comment..."
            buttonText="Send"
            onSubmit={onCommentSubmit}
            isLoading={isCommentLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PhotoModal;
