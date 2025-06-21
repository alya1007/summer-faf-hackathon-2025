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
		<nav className="navbar bg-accent flex justify-between items-center py-4 px-6">
			<Link to="/">Summer FAF Hackathon 2025</Link>
			{user ? (
				<ProfileDropdown user={user} onLogout={() => {}} />
			) : (
				<Button variant={"default"} onClick={handleGitHubLogin}>
					<span>Login with</span>
					<span>
						<FaGithub />
					</span>
				</Button>
			)}
		</nav>
	);
};

export default Navbar;
