import { useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import NotAccessPage from "../../pages/NotAccessPage/NotAccessPage";
import UserPage from "../../pages/UserPage/UserPage";
import { getAuthorizedUser } from "../../redux/actions/users";
import "./styles.scss";

const authorizedRoutes = [
  { path: "/", element: <MainPage />, exact: true },
  { path: "/:id", element: <UserPage />, exact: true },
];

const PageRoutes = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const isLoading = useSelector((state) => state.users.isAuthorizedUserLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorizedUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="cnPageRoutesLoader">
        <Bars color="#FF0000" height={80} width={80} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {authorizedUser ? (
          authorizedRoutes.map((route) => <Route {...route} key={route.path} />)
        ) : (
          <Route path="/" element={<NotAccessPage />} exact />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
