import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Link, Route, useNavigate } from "react-router-dom";
const UserRegister = lazy(() => import("./PublicPages/UserRegister"));
const UserLogin = lazy(() => import("./PublicPages/UserLogin"));
const Home = lazy(() => import("./PublicPages/Home"));
const ProductList = lazy(() => import("./PublicPages/ProductList"));
const ProductDetails = lazy(() => import("./PublicPages/ProductDetails"));
const CartPage = lazy(() => import("./PublicPages/CartPage"));
const Checkout = lazy(() => import("./UserPages/Checkout"));
const MyOrders = lazy(() => import("./UserPages/MyOrder"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const AdminManageProducts = lazy(() => import("./AdminPages/AdminProducts"));
const AdminManageOrders = lazy(() => import("./AdminPages/AdminOrders"));
const AdminManageUsers = lazy(() => import("./AdminPages/AdminUsers"));
const AdminManageSalesReport = lazy(() => import("./AdminPages/AdminSalesReports"));
const AdminDashboard = lazy(() => import("./AdminPages/AdminDashboard"));
const WishlistPage = lazy(() => import("./PublicPages/WishlistPage"));
const ReviewsPage = lazy(() => import("./PublicPages/ReviewPage"));
const PaymentPage = lazy(() => import("./PublicPages/PaymentPage"));
const About = lazy(() => import("./PublicPages/AboutUs"));
const Contact = lazy(() => import("./PublicPages/Contact"));


const RouterPage = (props) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token") || "");
      setRole(localStorage.getItem("role") || "");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function handleLogout() {
    if (window.confirm("Are you sure want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken("");
      setRole("");
      navigate("/register");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav
        className={`h-16 bg-${
          role === "admin" ? "gray-800" : "pink-600"
        } text-white shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
          <div className="flex space-x-4 items-center font-semibold text-lg">
            <Link to="/home" className="hover:text-pink-200">
              Home
            </Link>
            {token && (
              <>
                <Link to="/products" className="hover:text-pink-200">
                  {" "}
                  Products{" "}
                </Link>
                <Link to="/products/:id" className="hover:text-pink-200">
                  {" "}
                  Product Details{" "}
                </Link>
                <Link to="/cart" className="hover:text-pink-200">
                  {" "}
                  Cart{" "}
                </Link>
                <Link to="/about" className="hover:text-pink-200">
                  About Us
                </Link>
                <Link to="/contact" className="hover:text-pink-200">
                  Contact
                </Link>
              </>
            )}
          </div>

          <div className="flex space-x-4">
            {!token ? (
              <>
                <Link
                  to="/register"
                  className="bg-white text-pink-600 px-4 py-1 rounded hover:bg-pink-100 font-medium"
                >
                  {" "}
                  Register{" "}
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-pink-600 px-4 py-1 rounded hover:bg-pink-100 font-medium"
                >
                  {" "}
                  Login{" "}
                </Link>
              </>
            ) : (
              <>
                {role === "user" && (
                  <>
                    <Link to="/checkout" className="hover:text-pink-200">
                      Checkout
                    </Link>
                    <Link to="/myorder" className="hover:text-pink-200">
                      My Orders
                    </Link>
                  </>
                )}
                {role === "admin" && (
                  <>
                    <Link to="/admin/dashboard" className="hover:text-pink-200">
                      Dashboard
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-white text-pink-600 px-4 py-1 rounded hover:bg-pink-100 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-auto bg-pink-50 py-6 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div>...Loading </div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<UserRegister />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/*User Protected Routes */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute role="user">
                  {" "}
                  <Checkout />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/myorder"
              element={
                <ProtectedRoute role="user">
                  {" "}
                  <MyOrders />{" "}
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute role="admin">
                  <AdminManageProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute role="admin">
                  <AdminManageOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role="admin">
                  <AdminManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute role="admin">
                  <AdminManageSalesReport />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route
              path="*"
              element={
                <p className="text-sm text-center text-black ">
                  Page Not Found
                </p>
              }
            />
          </Routes>
        </Suspense>
      </main>

      <footer className="h-12 bg-gray-100 text-center text-sm text-gray-600 py-2">
        © 2025 CakeDrop. All rights reserved.
      </footer>
    </div>
  );
};

export default RouterPage;
