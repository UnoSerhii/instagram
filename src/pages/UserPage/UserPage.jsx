import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import UserBio from "../../components/UserBio/UserBio";
import { toggleLike } from "../../redux/actions/photos";
import "./styles.scss";

const UserPage = () => {
  const authorizedUser = useSelector(state => state.users.authorizedUser);
  const dispatch = useDispatch();

  const onLikeClick = (photoId) => {
    dispatch(toggleLike(authorizedUser.id, photoId))
  }

  return (
    <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
      <div className="cnUserPageRoot">
        <UserBio
          avatarUrl={authorizedUser.avatarUrl}
          nickname={authorizedUser.nickname}
          subscribers={authorizedUser.subscribers.length}
          subscribed={authorizedUser.subscribed.length}
          firstName={authorizedUser.firstName}
          lastName={authorizedUser.lastName}
          description={authorizedUser.description}
          url={authorizedUser.url}
          />

          <div className="cnUserPageRootContent">
            <Card imgUrl="" className="cnUserPageRootContent" likes={10} comments={20} onLikeClick={() => onLikeClick('')} />
            <Card imgUrl="" className="cnUserPageRootContent" likes={10} comments={20} />
            <Card imgUrl="" className="cnUserPageRootContent" likes={10} comments={20} />
          </div>
      </div>
    </Layout>
  );
};

export default UserPage;
