import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Signup from "./Signup";
import Friends from "./Friends";
import Account from "./Account";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
import Welcome from "./Welcome";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Welcome />
        },
        {
          path: "login",
          element: <Login />,
        },

        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/user",
      element: <Header />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":id",
          children: [
            {
              path: "conversation",
              element: <Sidebar />,
              children: [
                {
                  index: true,
                  element: <Chatbox />
                },
                {
                  path: ":friend_id",
                  element: <Chatbox />,
                },
              ],
            },
            {
              path: "friends",
              element: <Friends />,
            },
            {
              path: "account",
              element: <Account />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
