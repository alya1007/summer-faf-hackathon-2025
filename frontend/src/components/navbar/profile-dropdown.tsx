import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import type { User } from "../../pages/auth-callback";

type ProfileDropdownProps = {
	user: User;
	onLogout: () => void;
};

const ProfileDropdown = ({ user, onLogout }: ProfileDropdownProps) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setOpen(!open)}
				className="flex items-center space-x-2 px-4 hover:cursor-pointer py-2 hover:bg-primary/80 bg-primary  rounded-lg transition"
			>
				<img
					src={user.profile_pic_url}
					alt="avatar"
					className="w-8 h-8 rounded-full object-cover"
				/>
				<span className="font-medium text-white">{user.username}</span>
			</button>

			{open && (
				<div className="absolute right-0 mt-2 bg-card-secondary text-white rounded-lg shadow-lg z-50 w-full">
					<div className="flex flex-col py-2">
						<Link
							to="/profile"
							className="px-4 py-2 hover:bg-card text-sm font-bold"
							onClick={() => setOpen(false)}
						>
							Profile
						</Link>
						<button
							onClick={() => {
								setOpen(false);
								onLogout();
							}}
							className="px-4 py-2 hover:bg-card text-sm text-left text-red-600 font-bold hover:cursor-pointer"
						>
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileDropdown;
