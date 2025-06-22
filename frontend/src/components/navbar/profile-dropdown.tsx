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
				className="group flex items-center overflow-hidden 
						bg-gradient-to-r from-purple-200 to-indigo-400 text-black text-base hover:from-gray-800 hover:to-gray-700
						hover:text-white font-semibold
						px-4 py-1 rounded-xl
						shadow-lg hover:shadow-xl
						border border-gray-700 hover:border-gray-600
						transform hover:scale-105 transition-all duration-300"
			>
				<img
					src={user.profile_pic_url}
					alt="avatar"
					className="w-9 h-9 rounded-full object-cover mr-2"
				/>
				<span className="font-medium">{user.username}</span>
			</button>

			{open && (
				<div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg z-50 w-full">
					<div className="flex flex-col py-2">
						<Link
							to="/profile"
							className="px-4 py-2 hover:bg-gray-100 text-sm font-bold"
							onClick={() => setOpen(false)}
						>
							Profile
						</Link>
						<div className="hover:bg-gray-100">
						<button
							onClick={() => {
								setOpen(false);
								onLogout();
							}}
							
							className="px-4 py-2 bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent text-sm text-left font-bold hover:cursor-pointer "
						>
							Logout
						</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileDropdown;
