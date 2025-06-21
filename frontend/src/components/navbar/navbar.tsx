import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
	const handleGitHubLogin = () => {
		const githubUrl = import.meta.env.VITE_GITHUB_AUTH_URL || "";

		window.location.href = githubUrl;
	};

	return (
		<nav className="navbar bg-accent flex justify-between items-center py-4 px-6">
			<a href="/">Summer FAF Hackathon 2025</a>
			<Button variant={"default"} onClick={handleGitHubLogin}>
				<span> Login with</span>
				<span>
					<FaGithub />
				</span>
			</Button>
		</nav>
	);
};

export default Navbar;
