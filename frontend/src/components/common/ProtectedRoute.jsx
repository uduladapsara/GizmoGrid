import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const ProtectedRoute = ({ roles = [], children }) => {
	const { user } = useAuth();
	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	if (roles.length > 0 && !roles.includes(user.role)) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
