import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Signup from "./Signup";
import Friends from "./Friends";
import Account from "./Account";
import Header from "./Header";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <App /> },
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "/account",
          element: <Account />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
