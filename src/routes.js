import App from "./App";
import Details from "./pages/Details";
import Home from "./pages/Home";
import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import { redirectIfAuth, requireAuth } from "./services/authRoutes";
import Dashboard from "./pages/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/:id",
        Component: Details,
      },
      {
        path: "/login",
        Component: Login,
        loader: redirectIfAuth,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
        loader: requireAuth,
      },
    ],
  },
]);

export default routes;
