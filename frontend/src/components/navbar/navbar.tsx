import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
	return (
		<nav className="navbar bg-accent flex justify-between items-center p-4">
			<a href="/">Summer FAF Hackathon 2025</a>
			<Button variant={"default"}>
				<span> Login with</span>
				<span>
					<FaGithub />
				</span>
			</Button>
		</nav>
	);
};

export default Navbar;
