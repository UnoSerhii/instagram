import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import UserBio from "../../components/UserBio/UserBio";
import { getPostsByUser, toggleLikeOnPost } from "../../redux/actions/postsByUser";
import "./styles.scss";

const UserPage = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const posts = useSelector((state) => state.postsByUser.posts);
  const isLoading = useSelector((state) => state.postsByUser.isPostsLoading);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostsByUser(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLikeClick = (photoId) => {
    dispatch(toggleLikeOnPost(authorizedUser.id, photoId, id));
  };

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
          {posts.map(({comments, likes, imgUrl, id}) =>
            <Card
              imgUrl={imgUrl}
              className="cnUserPageRootCard"
              likes={likes.length}
              comments={comments.length}
              isLikeByYou={likes.includes(authorizedUser.id)}
              onLikeClick={() => onLikeClick(id)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
