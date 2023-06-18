import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import Error from "./Error";
import Header from "../components/Header/Header";
import About from "./About";
import Favorites from "./Favorites";
import { FC, ReactElement } from "react";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const App: FC = (): ReactElement => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
