import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AddProduct,
  Analytics,
  Login,
  NotFound,
  Notifications,
  Orders,
  Product,
  Products,
  Profile,
  Signup,
} from "./pages";
import { Footer, Navbar } from "./components";
import useAuthStore from "./store/authStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  // Check if the current page is an authentication page
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Analytics /> : <Navigate to="/signup" />}
        />
        <Route
          path="/addProduct"
          element={isAuthenticated ? <AddProduct /> : <Navigate to="/signup" />}
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? <Notifications /> : <Navigate to="/signup" />
          }
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <Orders /> : <Navigate to="/signup" />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <Products /> : <Navigate to="/signup" />}
        />
        <Route
          path="/product"
          element={isAuthenticated ? <Product /> : <Navigate to="/signup" />}
        />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/signup" />} />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      />
    </div>
  );
};

export default App;
