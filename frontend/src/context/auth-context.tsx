import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../pages/auth-callback";

const AuthContext = createContext<{
	user: User | null;
	setUser: (user: User | null) => void;
}>({
	user: null,
	setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(() => {
		const raw = localStorage.getItem("user");
		return raw ? JSON.parse(raw) : null;
	});

	useEffect(() => {
		if (user) localStorage.setItem("user", JSON.stringify(user));
		else localStorage.removeItem("user");
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
