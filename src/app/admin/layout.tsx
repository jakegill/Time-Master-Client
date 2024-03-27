"use client";
import {
	IconSettings,
	IconLayoutGrid,
	IconUsers,
	IconUserPlus,
	IconListCheck,
	IconPlaylistAdd,
	IconCalendarClock,
	IconReport
} from "@tabler/icons-react";
import Link from "next/link";

export default function AdminDashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
				<div className="flex">
					<Sidebar />
					<main className="w-[85vw] h-[100vh] px-[3vw] py-[4vh]">{children}</main>
				</div>
		</>
	);
}

function Sidebar() {
	return (
		<aside className="text-[1rem] w-[15vw] h-[100vh] bg-[#212529] grid grid-rows-[0.5fr_2.5fr_0.5fr] justify-items-start pl-[1vw] text-zinc-50 ">
			<h2 className="font-semibold text-2xl text-[#f8f9fa] flex items-center h-full ">Timemaster Pro</h2>

			<div className="flex flex-col gap-[2.5vh]">
				<div className="flex flex-col gap-[1vh]">
					<h3 className="text-[#6c757d] text-sm">MAIN MENU</h3>
					<div className="flex flex-col gap-[0.5vh]">
						<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
							<IconLayoutGrid size={18} />
							<Link href="/admin/dashboard">Dashboard</Link>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-[1vh]">
					<h3 className="text-[#6c757d] text-sm">USERS</h3>
					<div className="flex flex-col gap-[0.5vh]">
						<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
							<IconUsers size={18} />
							<Link href="/admin/dashboard/users">Employees</Link>
						</div>
						<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
							<IconUserPlus size={18} />
							<Link href="/admin/dashboard/users/register">Register</Link>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-[1vh]">
					<h3 className="text-[#6c757d] text-sm">PROJECTS</h3>
					<div className="flex flex-col gap-[0.5vh]">
						<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
							<IconListCheck size={18} />
							<Link href="/admin/dashboard/projects">View Projects</Link>
						</div>
						<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
							<IconPlaylistAdd size={18} />
							<Link href="/admin/dashboard/projects/create">Create Project</Link>
						</div>
						<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
							<IconUserPlus size={18} />
							<Link href="/admin/dashboard/projects/assign">Assign Project</Link>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-[1vh]">
					<h3 className="text-[#6c757d] text-sm">TIMELOGS</h3>
					<div className="flex flex-col gap-[0.5vh]">
						<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
							<IconCalendarClock size={18} />
							<Link href="/admin/dashboard/forms">View Timelogs</Link>
						</div>
						<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
							<IconReport size={18} />
							<Link href="/admin/dashboard/forms/create">Generate Report</Link>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-[1vh]">
					<h3 className="text-[#6c757d] text-sm">PREFERENCES</h3>
					<div className="flex flex-col gap-[0.5vh]">
						<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
							<IconSettings size={18} />
							<Link href="/admin/xiBx/dashboard/settings">Settings</Link>
						</div>
					</div>
				</div>
			</div>

			<div></div>
		</aside>
	);
}