import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";

const MainLayout = () => {
	return (
		<div className="page-shell min-h-screen">
			<Navbar />
			<main className="mx-auto w-full max-w-6xl px-4 py-10">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
