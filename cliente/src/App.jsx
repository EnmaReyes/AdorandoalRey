import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
//? import rutas\\
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import Aboutme from "./pages/Aboutme";
import EditUser from "./pages/EditUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//! Rutas de las Paginas \\
const Layout = () => {
  return (
    <>
      <ToastContainer />
      <NavBar />
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
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/edit",
        element: <EditUser />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/aboutme",
        element: <Aboutme />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  //! Rutas de las Paginas \\
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
