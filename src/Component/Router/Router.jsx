import App from "../../App";
import Erro from "../../Pages/ErroPage/ErroPage";
import { HomePage } from "../../Pages/Home/HomePage";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

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
      // {
      //   path: "/campaign/:id",
      //   element: (
      //     <PrivateRoute>
      //       <CampaignDetails />
      //     </PrivateRoute>
      //   ),
      // },

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
