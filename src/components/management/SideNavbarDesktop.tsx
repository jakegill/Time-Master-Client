"use client";
import {
	IconHome,
	IconChartBar,
	IconFileSymlink,
	IconUsers,
	IconUserPlus,
	IconListCheck,
	IconPlaylistAdd,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideNavbarDesktop() {
	const pathname = usePathname();

	const isActive = (path: string) => {
		const currentPath = `/${pathname.split("/").slice(1).join("/")}`; //removes locale from pathname
		return currentPath === path;
	};

	return (
		<>
			<aside className="h-full w-72 bg-neutral-darkest xl:block hidden">
				<menu className="grid h-full p-4 grid-rows-[0.05fr_0.95fr] w-full">
					<h2 className="text-xl font-semibold text-neutral-lightest flex items-center">Timemaster Pro</h2>
					<div className="flex flex-col">
						<div>
							<h3 className="py-2 text-neutral-medium">Dashboard</h3>
							<ul className="flex flex-col gap-2">
								<Link
									href="/management"
									className={
										isActive("/management")
											? "flex items-center gap-2 px-4 py-2 rounded-md bg-primary-medium text-primary-lightest font-semibold"
											: "flex items-center gap-2 px-4 py-2 text-neutral-medium"
									}
								>
									<IconHome
										size={24}
										stroke={isActive("/management") ? "hsl(202, 100%, 95%)" : "hsl(210, 16%, 82%)"}
										color={isActive("/management") ? "hsl(202, 100%, 95%)" : "hsl(211, 10%, 58%)"}
									/>
									Home
								</Link>
								<Link
									href="/management/analytics"
									className={
										isActive("/management/analytics")
											? "flex items-center gap-2 px-4 py-2 rounded-md bg-primary-medium text-primary-lightest font-semibold"
											: "flex items-center gap-2 px-4 py-2 text-neutral-medium"
									}
								>
									<IconChartBar
										size={24}
										stroke={isActive("/management/analytics") ? "hsl(202, 100%, 95%)" : "hsl(210, 16%, 82%)"}
										color={isActive("/management/analytics") ? "hsl(202, 100%, 95%)" : "hsl(211, 10%, 58%)"}
									/>
									Analytics
								</Link>
							</ul>
						</div>
						<div>
							<h3 className="py-2 text-neutral-medium">Employees</h3>
							<ul className="flex flex-col gap-2">
								<Link
									href="/management/employees"
									className={
										isActive("/management/employees")
											? "flex items-center gap-2 px-4 py-2 rounded-md bg-primary-medium text-primary-lightest font-semibold"
											: "flex items-center gap-2 px-4 py-2 text-neutral-medium"
									}
								>
									<IconUsers
										size={24}
										stroke={isActive("/management/employees") ? "hsl(202, 100%, 95%)" : "hsl(210, 16%, 82%)"}
										color={isActive("/management/employees") ? "hsl(202, 100%, 95%)" : "hsl(211, 10%, 58%)"}
									/>
									Manage
								</Link>
								<Link
									href="/management/employees/register"
									className={
										isActive("/management/employees/register")
											? "flex items-center gap-2 px-4 py-2 rounded-md bg-primary-medium text-primary-lightest font-semibold"
											: "flex items-center gap-2 px-4 py-2 text-neutral-medium"
									}
								>
									<IconUserPlus
										size={24}
										stroke={isActive("/management/employees/register") ? "hsl(202, 100%, 95%)" : "hsl(210, 16%, 82%)"}
										color={isActive("/management/employees/register") ? "hsl(202, 100%, 95%)" : "hsl(211, 10%, 58%)"}
									/>
									Register
								</Link>
								<Link
									href="/management/employees/assign"
									className={
										isActive("/management/employees/assign")
											? "flex items-center gap-2 px-4 py-2 rounded-md bg-primary-medium text-primary-lightest font-semibold"
											: "flex items-center gap-2 px-4 py-2 text-neutral-medium"
									}
								>
									<IconFileSymlink
										size={24}
										stroke={isActive("/management/employees/assign") ? "hsl(202, 100%, 95%)" : "hsl(210, 16%, 82%)"}
										color={isActive("/management/employees/assign") ? "hsl(202, 100%, 95%)" : "hsl(211, 10%, 58%)"}
									/>
									Assign
								</Link>
							</ul>
						</div>
						<div>
							<h3 className="py-2 text-neutral-medium">Projects</h3>
							<ul className="flex flex-col gap-2">
								<Link
									href="/management/projects"
									className={
										isActive("/management/projects")
											? "flex items-center gap-2 px-4 py-2 rounded-md bg-primary-medium text-primary-lightest font-semibold"
											: "flex items-center gap-2 px-4 py-2 text-neutral-medium"
									}
								>
									<IconListCheck
										size={24}
										stroke={isActive("/management/projects") ? "hsl(202, 100%, 95%)" : "hsl(210, 16%, 82%)"}
										color={isActive("/management/projects") ? "hsl(202, 100%, 95%)" : "hsl(211, 10%, 58%)"}
									/>
									Manage
								</Link>
								<Link
									href="/management/projects/create"
									className={
										isActive("/management/projects/create")
											? "flex items-center gap-2 px-4 py-2 rounded-md bg-primary-medium text-primary-lightest font-semibold"
											: "flex items-center gap-2 px-4 py-2 text-neutral-medium"
									}
								>
									<IconPlaylistAdd
										size={24}
										stroke={isActive("/management/projects/create") ? "hsl(202, 100%, 95%)" : "hsl(210, 16%, 82%)"}
										color={isActive("/management/projects/create") ? "hsl(202, 100%, 95%)" : "hsl(211, 10%, 58%)"}
									/>
									Create
								</Link>
							</ul>
						</div>
					</div>
				</menu>
			</aside>
		</>
	);
}