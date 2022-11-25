import { useEffect, useState } from "react";
import UserCounter from "../UserCounter/UserCounter";
import "./styles.scss";

const UserBio = ({ avatarUrl, nickname, subscribers, subscribed, firstName, lastName, description, url, isMyPage, isSubscribed }) => {
  const [btnProps, setBtnProps] = useState({onClick: () => false, children: 'Follow'})

  useEffect(() => {
    if (isMyPage) {
      setBtnProps({onClick: () => false, children: 'Edit'})
    } else if (isSubscribed) {
      setBtnProps({onClick: () => false, children: 'Unfollow'})
    } else {
      setBtnProps({onClick: () => false, children: 'Follow'})
    }
  }, [isMyPage, isSubscribed])
  return (
    <div className="cnUserBioRoot">
      <div> 
        <img className="cnUserBioAvatar" src={avatarUrl} alt="avatar" />
      </div>
      <div className="cnUserBioInfo">
        <div className="cnUserBioRow">
          <span className="cnUserBioNickname">{nickname}</span>
          <button className="cnButton" {...btnProps} />
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
