"use client";
import {
	IconHome,
	IconChartBar,
	IconFiles,
	IconFilePlus,
	IconFileSymlink,
    IconSettings,
	IconLayoutGrid,
	IconUsers,
	IconUserPlus,
	IconListCheck,
	IconPlaylistAdd,
	IconCalendarClock,
	IconReport
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SideNavbarMobileProps {
	isHidden: boolean;
	setIsSideMenuHidden: (newState: boolean) => void;
}

export default function SideNavbarMobile({ isHidden, setIsSideMenuHidden }: SideNavbarMobileProps) {
	const pathname = usePathname();

	const isActive = (path: string) => {
		const currentPath = `/${pathname.split("/").slice(1).join("/")}`; //removes locale from pathname
		return currentPath === path;
	};

	return (
		<>
			{/* Background overlay */}
			<div
				className={`fixed inset-0 z-10 ${isHidden ? "hidden" : "bg-neutral-darkest opacity-80 animate-fadeInLeft"}`}
				onClick={() => {
					setIsSideMenuHidden(true);
				}}
			></div>

			{/* Side Menu */}
			<aside
				className={`fixed top-0 left-0 h-full w-72 bg-neutral-darkest z-20 animate-fadeInLeftSlow ${
					isHidden ? "hidden animate-fadeOutLeft" : "block"
				}`}
			>
				<menu className="grid h-full p-4 grid-rows-[0.05fr_0.95fr]">
					<h2 className="text-xl font-semibold text-neutral-lightest flex items-center">Timemaster Pro</h2>
					<div className="flex flex-col">
						<div>
							<h3 className="py-2 text-neutral-medium">Dashboard</h3>
							<ul className="flex flex-col gap-2">
								<Link
									href="/employee"
									className={
										isActive("/employee")
											? "flex items-center gap-2 px-4 py-2 rounded-md bg-primary-medium text-primary-lightest font-semibold"
											: "flex items-center gap-2 px-4 py-2 text-neutral-medium"
									}
								>
									<IconCalendarClock
										size={24}
										stroke={isActive("/employee") ? "hsl(202, 100%, 95%)" : "hsl(210, 16%, 82%)"}
										color={isActive("/employee") ? "hsl(202, 100%, 95%)" : "hsl(211, 10%, 58%)"}
									/>
									My Projects
								</Link>
							</ul>
						</div>
						<div>
							<h3 className="py-2 text-neutral-medium">Timelogs</h3>
							<ul className="flex flex-col gap-2">
								<Link
									href="/employee/timelogs"
									className={
										isActive("/employee/timelogs")
											? "flex items-center gap-2 px-4 py-2 rounded-md bg-primary-medium text-primary-lightest font-semibold"
											: "flex items-center gap-2 px-4 py-2 text-neutral-medium"
									}
								>
									<IconPlaylistAdd
										size={24}
										stroke={isActive("/employee/timelogs") ? "hsl(202, 100%, 95%)" : "hsl(210, 16%, 82%)"}
										color={isActive("/employee/timelogs") ? "hsl(202, 100%, 95%)" : "hsl(211, 10%, 58%)"}
									/>
									View Timelogs
								</Link>
							</ul>
						</div>
					</div>
				</menu>
			</aside>
		</>
	);
}