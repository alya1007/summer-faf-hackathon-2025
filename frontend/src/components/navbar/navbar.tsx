import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import ProfileDropdown from "./profile-dropdown";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const Navbar = () => {
	const handleGitHubLogin = () => {
		const githubUrl = import.meta.env.VITE_GITHUB_AUTH_URL || "";

		window.location.href = githubUrl;
	};

	const { user } = useAuth();

	return (
		<nav className="sticky top-0 z-50 bg-gradient-to-br from-purple-600 to-blue-600 ">
			<div className="px-4 sm:px-6 lg:px-20">
				<div className="flex items-center justify-between h-16 ">
			<Link to="/" className="group font-bold text-2xl text-white font-[Apple Color Emoji]">ContributeIT</Link>
			{user ? (
				<ProfileDropdown user={user} onLogout={() => {}} />
			) : (
				<Button onClick={handleGitHubLogin}
				className="group relative overflow-hidden
						bg-gradient-to-r from-purple-300 to-blue-300 text-black text-base hover:from-gray-800 hover:to-gray-700
						hover:text-white font-semibold
						px-6 py-2.5 rounded-xl
						shadow-lg hover:shadow-xl
						border border-gray-700 hover:border-gray-600
						transform hover:scale-105 transition-all duration-300">
					<span>Login with</span>
					<span>
						<FaGithub />
					</span>
				</Button>
			)}
			
			</div>
			</div>
		</nav>
	);
};

export default Navbar;
