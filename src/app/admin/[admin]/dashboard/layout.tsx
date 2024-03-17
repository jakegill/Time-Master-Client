import { IconSettings,IconLayoutGrid, IconUsers, IconUserPlus, IconClipboardList  } from "@tabler/icons-react";
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
				<main className="w-[90vw] h-[90vh]">{children}</main>
			</div>
		</>
	);
}

function Sidebar() {
	return (
		<aside className="w-[15vw] h-[100vh] bg-[#212529] flex flex-col px-[2vw] py-[5vh] gap-[2.5vh] text-zinc-50 ">
			<h2 className="font-semibold text-2xl text-[#f8f9fa]">Time Master</h2>

			<div className="flex flex-col gap-[1vh]">
				<h3 className="text-[#6c757d] text-sm">MAIN MENU</h3>
				<div className="flex flex-col gap-[0.5vh]">
					<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
						<IconLayoutGrid size={18}/><Link href="/admin/xiBX/dashboard">Dashboard</Link>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-[1vh]">
				<h3 className="text-[#6c757d] text-sm">USERS</h3>
				<div className="flex flex-col gap-[0.5vh]">
					<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
						<IconUsers size={18}/><Link href="/admin/xiBX/dashboard/users">Employees</Link>
					</div>
					<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
						<IconUserPlus size={18}/><Link href="/admin/xiBX/dashboard/register">Register</Link>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-[1vh]">
				<h3 className="text-[#6c757d] text-sm">PROJECTS</h3>
				<div className="flex flex-col gap-[0.5vh]">
					<div className="flex items-center gap-[0.5vw] hover:bg-[#343a40] transition-colors p-[2px] rounded-md">
						<IconClipboardList size={18}/><Link href="/admin/xiBX/dashboard/projects">Projects</Link>
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
		</aside>
	);
}
