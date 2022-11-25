import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../redux/actions/users";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import UserBio from "../../components/UserBio/UserBio";
import { getPostsByUser, sendCommentOnUserPage, toggleLikeOnPost } from "../../redux/actions/postsByUser";
import "./styles.scss";
import { nanoid } from "nanoid";

const UserPage = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const user = useSelector((state) => state.users.user);
  const posts = useSelector((state) => state.postsByUser.posts);
  const isPostsLoading = useSelector((state) => state.postsByUser.isPostsLoading);
  const isUserLoading = useSelector((state) => state.users.isUserLoading);
  const mutateLoading = useSelector((state) => state.photos.mutateLoading);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [postsForRender, setPostsForRender] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const newPost = [...posts];
    if (newPost.length) {
      setPostsForRender(newPost.splice(0, 12));
    }
  }, [posts]);

  useEffect(() => {
    dispatch(getPostsByUser(id));
    dispatch(getUser(id));
  }, [id, dispatch]);

  const onLikeClick = (photoId) => {
    dispatch(toggleLikeOnPost(authorizedUser.id, photoId, id));
  };

  const onCommentSendClick = (photoId, comment) => {
    dispatch(sendCommentOnUserPage(authorizedUser.nickname, photoId, user.id, comment))
  }

  const nextHandler = () => {
    const newPosts = [...posts];
    const offset = 12 * (page + 1);

    setPostsForRender([...postsForRender, ...newPosts.splice(offset, offset + 12)]);
    setPage(page + 1);
  };

  return (
    <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
      {isPostsLoading || isUserLoading ? (
        <div className="cnMainLoaderContainer">
          <Bars color="#FF0000" height={80} width={80} />
        </div>
      ) : (
        <div className="cnUserPageRoot">
          <UserBio
            avatarUrl={user.avatarUrl}
            nickname={user.nickname}
            subscribers={user.subscribers.length}
            subscribed={user.subscribed.length}
            firstName={user.firstName}
            lastName={user.lastName}
            description={user.description}
            url={user.url}
            isMyPage={+id === +authorizedUser.id}
            isSubscribed={user.subscribers.includes(authorizedUser.id)}
          />
          <div className="cnUserPageRootContent">
            {postsForRender.length ? (
              <InfiniteScroll
                dataLength={postsForRender.length}
                next={nextHandler}
                hasMore={postsForRender.length < posts.length}
                loader={
                  <div className="cnMainLoaderContainer">
                    <Bars color="#FF0000" height={15} width={15} />
                  </div>
                }
                endMessage={<p className="cnMainLoaderContainer">Thats all!</p>}
                className="cnUserPageScroll"
              >
                {postsForRender.map(({ comments, likes, imgUrl, id }) => (
                  <Card
                    key={nanoid()}
                    imgUrl={imgUrl}
                    className="cnUserPageCard"
                    likes={likes.length}
                    comments={comments}
                    isLikeByYou={likes.includes(authorizedUser.id)}
                    onLikeClick={() => onLikeClick(id)}
                    userData={{
                      userName: user.nickname,
                      avatarUrl: user.avatarUrl,
                      userId: user.id,
                    }}
                    onCommentSubmit={(comment) => onCommentSendClick(id, comment)}
                    isMutateLoading={mutateLoading}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <p className="cnUserPageNoPosts">User don't have posts</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserPage;
