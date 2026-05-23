import { NavLink } from "react-router-dom";

const Sidebar = ({ items, title }) => {
	return (
		<aside className="glass-card w-full rounded-2xl p-5 shadow-soft">
			<h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
				{title}
			</h3>
			<nav className="mt-4 space-y-2 text-sm">
				{items.map((item) => (
					<NavLink
						key={item.label}
						to={item.path}
						className={({ isActive }) =>
							`block rounded-xl px-4 py-2 transition ${
								isActive
									? "bg-slate-900 text-white"
									: "text-slate-600 hover:bg-slate-100"
							}`
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>
		</aside>
	);
};

export default Sidebar;
