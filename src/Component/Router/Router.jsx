import App from "../Layout/App";
import AddArticlePage from "../../Pages/AddArticlePage/AddArticlePage";
import AllArticlesPage from "../../Pages/AllArticlesPage/AllArticlesPage";
import ArticleDetailsPage from "../../Pages/ArticleDetailsPage/ArticleDetailsPage";
import Erro from "../../Pages/ErroPage/ErroPage";
import HomePage from "../../Pages/Home/HomePage";
import MyProfilePage from "../../Pages/MyProfilePage/MyProfilePage";
import PaymentPage from "../../Pages/PaymentPage/PaymentPage";
import PremiumArticlesContainer from "../../Pages/PremiumArticlesPage/PremiumArticlesContainer";
import SubscriptionPage from "../../Pages/SubscriptionPage/SubscriptionPage";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import DashboardPage from "../../Dashboard/Pages/DashboardPage";
import AllUsersPage from "../../Dashboard/Pages/AllUsersPage";
import AddPublisherPage from "../../Dashboard/Pages/AddPublisherPage";
import AllDasbordArticlesPage from "../../Dashboard/Pages/AllDasbordArticlesPage";
import MyArticles from "../../Pages/MyArticles/MyArticles";
import UpdateArticalPage from "../../Pages/UpdateArticalPage/UpdateArticalPage";
import AdminRoute from "../PrivateRoute/AdminRoute";

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
        path: "/my-articles",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/articleDetails/:id",
        element: (
          <PrivateRoute>
            <ArticleDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateArticle/:id",
        element: (
          <PrivateRoute>
            <UpdateArticalPage />
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
    path: "dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        path: "maindashboard",
        element: (
          <AdminRoute>
            <DashboardPage />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsersPage />
          </AdminRoute>
        ),
      },
      {
        path: "add-publisher",
        element: (
          <AdminRoute>
            <AddPublisherPage />
          </AdminRoute>
        ),
      },
      {
        path: "all-articles",
        element: (
          <AdminRoute>
            <AllDasbordArticlesPage />
          </AdminRoute>
        ),
      },
    ],
  },
];

export default RoutersItems;
