import "./styles.scss";

const Card = ({ imgUrl, likes, comments, isLikeByYou, onLikeClick }) => {
  return (
    <div className="cnCardRoot">
      <img src={imgUrl} alt={imgUrl} className="cnCardImage" />
      <div className="cnCardHover" />
      <div className="onCardIcons">
        <i className={`${isLikeByYou ? "fas" : "far"} fa-heart cnCardIcon`} onClick={onLikeClick} />
        <span className="cnCardNumber cnCardLikes">{likes}</span>
        <i className="fas fa-comment cnCardIcon" />
        <span className="cnCardNumber">{comments}</span>
      </div>
    </div>
  );
};

export default Card;
