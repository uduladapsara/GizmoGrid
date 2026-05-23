import { createContext, useCallback, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const getStoredUser = () => {
	try {
		const raw = localStorage.getItem("gizmogird_user");
		return raw ? JSON.parse(raw) : null;
	} catch (error) {
		return null;
	}
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(getStoredUser);
	const [loading, setLoading] = useState(false);

	const login = useCallback((payload) => {
		setLoading(true);
		localStorage.setItem("gizmogird_user", JSON.stringify(payload));
		setUser(payload);
		setLoading(false);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("gizmogird_user");
		setUser(null);
	}, []);

	const value = useMemo(
		() => ({ user, login, logout, loading }),
		[user, login, logout, loading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
