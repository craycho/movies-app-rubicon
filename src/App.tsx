import "./assets/styles/App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/Root";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
import DetailsPage from "./pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/details",
        element: <DetailsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
