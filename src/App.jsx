import { Flex, Image } from "@chakra-ui/react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import AddListing from "./pages/AddListing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import EditListing from "./pages/EditListing";
import Home from "./pages/Home";
import Message from "./pages/Message";
import SingleListings from "./pages/SingleListings";
import Success from "./pages/Success";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const Layout = ({ children }) => {
    return (
      <>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
        {/* <Image
          src="https://s3-alpha-sig.figma.com/img/d964/5864/af9c765ec20c148d6c3cee2908f67105?Expires=1686528000&Signature=C-xqfyr08im2319MpT~Mzc9vOJbPe9SII77ICTo3y~HcZ5Uf-~H2TFWOK~b3xP~-KG~1g2Q29XLFo3pojeghbOaPeV80vZg8amGA6NDcsrE2FO527mEowUYK1JxXM2-ibRDAMC5~c4hW4WHbGiXNTlukcbPJLVN7yuYk8J-JZIcRVA4G3N93VSVWmR~LIDwZMWU7rC9kxhAHHVAvpjjBVIRviV5F-bgXZtpp4pipox5M912kPSkoHldHjVsIFNyTeWqRWe-zXUB6Kwbe3jZ5LkWmlcgHyQUBfu8uHVeOVYeGQsiWttR6Qr9WFwu8KbFar6E3b-aTTartv3ssaSJCDA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt="footer_image"
          w={"100%"}
          h={"200px"}
          objectFit={"cover"}
        /> */}
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
        {
          path: "/add",
          element: <AddListing />,
        },
        {
          path: "/edit/:id",
          element: <EditListing />,
        },
        {
          path: "/:id",
          element: <SingleListings />,
        },
      ],
    },

    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "/auth/signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/message",
      element: <Message />,
    },
    {
      path: "/success",
      element: <Success />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
