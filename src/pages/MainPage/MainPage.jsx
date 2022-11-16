import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos, mutatePhoto } from "../../redux/actions/photos";
import DetailedCard from "../../components/DetailedCard/DetailedCard";
import Layout from "../../components/Layout/Layout";
import "./styles.scss";

const MainPage = () => {
  const photos = useSelector((state) => state.photos.photos);
  const loading = useSelector((state) => state.photos.isPhotosLoading);
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const total = useSelector((state) => state.photos.totalPhotos);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  console.log(photos, "photos");

  useEffect(() => {
    dispatch(getPhotos(page));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);



  const nextHandler = () => {
    setPage(page + 1)
  }

  const onLikeClick = (photoId) => {
    dispatch(mutatePhoto(authorizedUser.id, photoId))
  }

  return (
    <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl} >
      <div className="cnMainPageRoot">
        <InfiniteScroll
          dataLength={photos.length}
          next={nextHandler}
          hasMore={photos.length < total}
          loader={
            <div className="cnMainLoaderContainer">
              <Bars color="#FF0000" height={15} width={15} />
            </div>
          }
          endMessage={<p className="cnMainLoaderContainer">Thats all!</p>}
        >
          {loading ? (
            <div className="cnMainLoaderContainer">
              <Bars color="#FF0000" height={80} width={80} />
            </div>
          ) : (
            photos.map(({ author, imgUrl, id, likes, comments }) => (
              <DetailedCard
                key={id}
                id={id}
                userName={author.nickname}
                userId={author.id}
                avatarUrl={author.avatarUrl}
                imgUrl={imgUrl}
                likes={likes.length}
                isLikedByYou={likes.includes(authorizedUser.id)}
                comments={comments}
                className="cnMainPageCard"
                onLikeClick={onLikeClick}
              />
            ))
          )}
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default MainPage;
