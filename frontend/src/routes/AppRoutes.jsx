import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import SellerLayout from "../layouts/SellerLayout.jsx";
import UserLayout from "../layouts/UserLayout.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import { ROLES } from "../utils/constants.js";

import Home from "../pages/public/Home.jsx";
import About from "../pages/public/About.jsx";
import Contact from "../pages/public/Contact.jsx";
import Products from "../pages/public/Products.jsx";
import ProductDetails from "../pages/public/ProductDetails.jsx";

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";

import UserDashboard from "../pages/user/UserDashboard.jsx";
import Profile from "../pages/user/Profile.jsx";
import Wishlist from "../pages/user/Wishlist.jsx";
import Orders from "../pages/user/Orders.jsx";
import Checkout from "../pages/user/Checkout.jsx";
import Cart from "../pages/user/Cart.jsx";

import SellerDashboard from "../pages/seller/SellerDashboard.jsx";
import AddProduct from "../pages/seller/AddProduct.jsx";
import ManageProducts from "../pages/seller/ManageProducts.jsx";
import SellerOrders from "../pages/seller/SellerOrders.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";
import ManageSellers from "../pages/admin/ManageSellers.jsx";
import AdminProducts from "../pages/admin/ManageProducts.jsx";
import Reports from "../pages/admin/Reports.jsx";

const AppRoutes = () => (
	<Routes>
		<Route element={<MainLayout />}>
			<Route index element={<Home />} />
			<Route path="products" element={<Products />} />
			<Route path="products/:id" element={<ProductDetails />} />
			<Route path="about" element={<About />} />
			<Route path="contact" element={<Contact />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="forgot-password" element={<ForgotPassword />} />
		</Route>

		<Route
			path="/user"
			element={
				<ProtectedRoute roles={[ROLES.USER]}>
					<UserLayout />
				</ProtectedRoute>
			}
		>
			<Route index element={<Navigate to="dashboard" replace />} />
			<Route path="dashboard" element={<UserDashboard />} />
			<Route path="cart" element={<Cart />} />
			<Route path="orders" element={<Orders />} />
			<Route path="wishlist" element={<Wishlist />} />
			<Route path="profile" element={<Profile />} />
			<Route path="checkout" element={<Checkout />} />
		</Route>

		<Route
			path="/seller"
			element={
				<ProtectedRoute roles={[ROLES.SELLER]}>
					<SellerLayout />
				</ProtectedRoute>
			}
		>
			<Route index element={<Navigate to="dashboard" replace />} />
			<Route path="dashboard" element={<SellerDashboard />} />
			<Route path="add-product" element={<AddProduct />} />
			<Route path="products" element={<ManageProducts />} />
			<Route path="orders" element={<SellerOrders />} />
		</Route>

		<Route
			path="/admin"
			element={
				<ProtectedRoute roles={[ROLES.ADMIN]}>
					<AdminLayout />
				</ProtectedRoute>
			}
		>
			<Route index element={<Navigate to="dashboard" replace />} />
			<Route path="dashboard" element={<AdminDashboard />} />
			<Route path="users" element={<ManageUsers />} />
			<Route path="sellers" element={<ManageSellers />} />
			<Route path="products" element={<AdminProducts />} />
			<Route path="reports" element={<Reports />} />
		</Route>

		<Route path="*" element={<Navigate to="/" replace />} />
	</Routes>
);

export default AppRoutes;
