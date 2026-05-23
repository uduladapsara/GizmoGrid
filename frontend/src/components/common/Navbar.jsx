import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../../hooks/useAuth.js";

const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);

	const handleSearch = (e) => {
		if (e.key === "Enter" && keyword.trim()) {
			navigate(`/products?keyword=${encodeURIComponent(keyword.trim())}`);
		}
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const dashboardPath =
		user?.role === "admin"
			? "/admin/dashboard"
			: user?.role === "seller"
			? "/seller/dashboard"
			: "/user/dashboard";

	return (
		<header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
				<Link to="/" className="flex items-center gap-3 text-lg font-semibold">
					<span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-900 text-white">
						GG
					</span>
					<span className="leading-tight">
						<span className="block text-xs uppercase tracking-[0.2em] text-slate-400">
							Market
						</span>
						GizmoGrid
					</span>
				</Link>

				<div className="hidden flex-1 items-center gap-6 px-8 md:flex">
					<label className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
						<FiSearch className="text-slate-400" />
						<input
							className="w-full bg-transparent outline-none placeholder:text-slate-400"
							placeholder="Search tech, fashion, home, and more"
							type="text"
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
							onKeyDown={handleSearch}
						/>
					</label>
					<nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
						<NavLink to="/products" className="hover:text-slate-900">
							Products
						</NavLink>
						<NavLink to="/about" className="hover:text-slate-900">
							About
						</NavLink>
						<NavLink to="/contact" className="hover:text-slate-900">
							Contact
						</NavLink>
					</nav>
				</div>

				<div className="flex items-center gap-3 text-sm">
					{user?.role === "user" && (
						<Link
							to="/user/cart"
							className="flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-2 text-white"
						>
							<FiShoppingCart />
							Cart
						</Link>
					)}

					{user ? (
						<div className="hidden items-center gap-2 md:flex">
							<Link
								to={dashboardPath}
								className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-700"
							>
								<FiUser />
								{user.name?.split(" ")[0] || "Dashboard"}
							</Link>
							<button
								onClick={handleLogout}
								className="flex items-center gap-1 rounded-full border border-rose-200 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
							>
								<FiLogOut />
								Logout
							</button>
						</div>
					) : (
						<Link
							to="/login"
							className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-700 md:flex"
						>
							<FiUser />
							Sign in
						</Link>
					)}

					<button
						className="md:hidden rounded-full border border-slate-200 p-2"
						type="button"
						aria-label="Open menu"
						onClick={() => setMenuOpen((prev) => !prev)}
					>
						<FiMenu />
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div className="border-t border-slate-100 bg-white px-4 pb-4 md:hidden">
					<nav className="mt-3 space-y-2 text-sm">
						<NavLink to="/products" className="block py-2 text-slate-700" onClick={() => setMenuOpen(false)}>Products</NavLink>
						<NavLink to="/about" className="block py-2 text-slate-700" onClick={() => setMenuOpen(false)}>About</NavLink>
						<NavLink to="/contact" className="block py-2 text-slate-700" onClick={() => setMenuOpen(false)}>Contact</NavLink>
						{user ? (
							<>
								<NavLink to={dashboardPath} className="block py-2 text-slate-700" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
								<button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block py-2 text-rose-600">Logout</button>
							</>
						) : (
							<NavLink to="/login" className="block py-2 text-slate-700" onClick={() => setMenuOpen(false)}>Sign in</NavLink>
						)}
					</nav>
				</div>
			)}
		</header>
	);
};

export default Navbar;
