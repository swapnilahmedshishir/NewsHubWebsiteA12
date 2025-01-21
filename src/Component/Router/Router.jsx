import App from "../Layout/App";
import AddArticlePage from "../../Pages/AddArticlePage/AddArticlePage";
import AllArticlesPage from "../../Pages/AllArticlesPage/AllArticlesPage";
import ArticleDetailsPage from "../../Pages/ArticleDetailsPage/ArticleDetailsPage";
import Erro from "../../Pages/ErroPage/ErroPage";
import { HomePage } from "../../Pages/Home/HomePage";
import MyProfilePage from "../../Pages/MyProfilePage/MyProfilePage";
import PaymentPage from "../../Pages/PaymentPage/PaymentPage";
import PremiumArticlesContainer from "../../Pages/PremiumArticlesPage/PremiumArticlesContainer";
import SubscriptionPage from "../../Pages/SubscriptionPage/SubscriptionPage";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard";

const RoutersItems = [
  {
    path: "/",
    element: <App></App>,
    errorElement: <Erro />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add-articles",
        element: (
          <PrivateRoute>
            <AddArticlePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/articles/:id",
        element: (
          <PrivateRoute>
            <ArticleDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <SubscriptionPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/premium-articles",
        element: (
          <PrivateRoute>
            <PremiumArticlesContainer />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-articles",
        element: <AllArticlesPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: "/",
      //   element: <HomePage />,
      // },
    ],
  },
];

export default RoutersItems;
