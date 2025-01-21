import App from "../../App";
import AddArticlePage from "../../Pages/AddArticlePage/AddArticlePage";
import Erro from "../../Pages/ErroPage/ErroPage";
import { HomePage } from "../../Pages/Home/HomePage";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
    ],
  },
];

export default RoutersItems;
