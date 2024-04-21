"use client";
import { IconMenu2, IconUserCircle } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import SideNavbarMobile from "./SideNavbarMobile";

export default function TopNavbar() {
	const [isSideMenuHidden, setIsSideMenuHidden] = useState(true);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);
	const toggleRef = useRef(null);

	useEffect(() => {
		const closeDropdown = (e: any) => {
			if (
				dropdownRef.current &&
				//@ts-ignore
				!dropdownRef.current.contains(e.target) &&
				toggleRef.current &&
				//@ts-ignore
				!toggleRef.current.contains(e.target)
			) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("click", closeDropdown);
		return () => document.removeEventListener("click", closeDropdown);
	}, []);

	return (
		<>
			<nav className="xl:hidden flex items-center justify-between w-full h-14 px-6 border-b-[1px] border-neutral-light">
				<IconMenu2
					onClick={() => setIsSideMenuHidden(!setIsSideMenuHidden)}
					stroke={"hsl(210, 16%, 82%)"}
					color={"hsl(209, 18%, 30%)"}
				/>
				<div className="relative dropdown-toggle" ref={toggleRef} onClick={() => setShowDropdown(!showDropdown)}>
					<IconUserCircle stroke={"hsl(210, 16%, 82%)"} size={28} color={"hsl(209, 18%, 30%)"} />
					<menu
						className={
							showDropdown
								? "px-4 py-8 rounded-md absolute flex flex-col justify-between shadow-sm right-4 top-full mt-2 h-44 w-48 bg-neutral-white border-[1px] border-neutral-light animate-dropdown origin-top-right"
								: "hidden"
						}
						ref={dropdownRef}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex w-full justify-center border-t-[1px] py-4 border-neutral-light">
							<p onClick={() => {}}>Logout</p>
						</div>
					</menu>
				</div>
			</nav>
			<SideNavbarMobile isHidden={isSideMenuHidden} setIsSideMenuHidden={setIsSideMenuHidden} />
		</>
	);
}
