import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthResponse = {
	access: string;
	refresh: string;
	user: {
		username: string;
		email: string;
		profile_pic_url: string;
		pref_langs: string[];
		pref_domains: string[];
	};
};

const AuthCallback = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const handleGitHubCallback = async () => {
			const code = new URLSearchParams(window.location.search).get("code");
			if (!code) return;

			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/auth/callback/`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ code }),
					}
				);

				const data = (await response.json()) as AuthResponse;

				if (response.ok) {
					localStorage.setItem("access_token", data.access);
					localStorage.setItem("refresh_token", data.refresh);
					localStorage.setItem(
						"user",
						JSON.stringify({
							username: data.user.username,
							email: data.user.email,
							profile_pic_url: data.user.profile_pic_url,
							pref_langs: data.user.pref_langs,
							pref_domains: data.user.pref_domains,
						})
					);
					navigate("/");
				} else {
					console.error("GitHub login error:", data);
				}
			} catch (err) {
				console.error("Callback failed:", err);
			}
		};

		handleGitHubCallback();
	}, [navigate]);

	return (
		<div className="flex items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">Processing GitHub Login...</h1>
		</div>
	);
};

export default AuthCallback;
