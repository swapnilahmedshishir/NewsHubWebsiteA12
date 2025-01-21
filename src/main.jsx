import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoutersItems from "./Component/Router/Router.jsx";
import ContextProvider from "./Context/ContextProvider.jsx";

const router = createBrowserRouter(RoutersItems, {
  future: {
    v7_startTransition: true,
    v7_normalizeFormMethod: true,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
