import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

interface JwtPayload {
	username: string;
}

const getToken = () => localStorage.getItem("token");

const getUsername = (token: string): string | null => {
	try {
		const decoded = jwtDecode<JwtPayload>(token);
		return decoded.username;
	} catch {
		return null;
	}
};

const Profile: React.FC = () => {
	const [username, setUsername] = useState<string | null>(null);

	useEffect(() => {
		const token = getToken();
		if (!token) return;

		const name = getUsername(token);
		setUsername(name);
	}, []);

	return (
		<div>
			<h1>Welcome, {username}!</h1>
		</div>
	);
};
export default Profile;
