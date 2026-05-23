import Sidebar from "../common/Sidebar.jsx";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const items = [
		{ label: "Overview", path: "/admin/dashboard" },
		{ label: "Users", path: "/admin/users" },
		{ label: "Sellers", path: "/admin/sellers" },
		{ label: "Products", path: "/admin/products" },
		{ label: "Reports", path: "/admin/reports" },
	];

	return (
		<Sidebar
			items={items}
			title="Admin"
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

export default AdminSidebar;
