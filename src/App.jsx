import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import SignUp from "./components/SignUp";
import AddListing from "./pages/AddListing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import EditListing from "./pages/EditListing";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import SingleListings from "./pages/SingleListings";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const Layout = ({ children }) => {
    return (
      <>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        { path: "/add", element: <AddListing /> },
        {
          path: "/edit/:id",
          element: <EditListing />,
        },
        {
          path: "/:id",
          element: <SingleListings />,
        },
      ],
      errorElement: <ErrorPage />,
    },

    {
      path: "/auth",
      element: <Auth />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
