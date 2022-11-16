import "./styles.scss";

const Comment = ({
  nickname,
  text,
}) => {
  return (
    <div className="cnCommentRoot">
      <span className="cnCommentName">{nickname}</span>
      <span className="cnCommentText">{text}</span>
      </div>
  )
}

export default Comment