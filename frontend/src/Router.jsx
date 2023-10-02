import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Signup from "./Signup";

export default function Router() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
}