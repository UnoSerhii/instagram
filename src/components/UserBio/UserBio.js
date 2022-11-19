import UserCounter from "../UserCounter/UserCounter";
import "./styles.scss";

const UserBio = ({ avatarUrl, nickname, subscribers, subscribed, firstName, lastName, description, url }) => {
  return (
    <div className="cnUserBioRoot">
      <div> 
        <img className="cnUserBioAvatar" src={avatarUrl} alt="avatar" />
      </div>
      <div className="cnUserBioInfo">
        <div className="cnUserBioRow">
          <span className="cnUserBioNickname">{nickname}</span>
        </div>
        <div className="cnUserBioRow cnUserBioContent">
          <UserCounter count={5} text="Posts" />
          <UserCounter count={subscribers} text="followers" />
          <UserCounter count={subscribed} text="following" />
        </div>
        <div className="cnUserBioRow">
          <span className="cnUserBioName">{firstName} {lastName}</span>
        </div>
        <div className="cnUserBioRow">
          <span>{description}</span>
        </div>
        <a href={url}>{url}</a>
      </div>
    </div>
  );
};

export default UserBio;
