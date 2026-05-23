import Sidebar from "../common/Sidebar.jsx";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const SellerSidebar = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const items = [
		{ label: "Dashboard", path: "/seller/dashboard" },
		{ label: "Add Product", path: "/seller/add-product" },
		{ label: "Manage Products", path: "/seller/products" },
		{ label: "Orders", path: "/seller/orders" },
	];

	return (
		<Sidebar
			items={items}
			title="Seller"
			footer={
				<button
					onClick={handleLogout}
					className="w-full rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
				>
					Logout
				</button>
			}
		/>
	);
};

export default SellerSidebar;
