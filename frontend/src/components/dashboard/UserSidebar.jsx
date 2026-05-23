import Sidebar from "../common/Sidebar.jsx";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const items = [
		{ label: "Dashboard", path: "/user/dashboard" },
		{ label: "Orders", path: "/user/orders" },
		{ label: "Wishlist", path: "/user/wishlist" },
		{ label: "Profile", path: "/user/profile" },
	];

	return (
		<Sidebar
			items={items}
			title="User"
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

export default UserSidebar;
