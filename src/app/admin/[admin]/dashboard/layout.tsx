import { CircleUser, AlignJustify } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<TopNavbar />
			<div className='flex'>
				<SideNavbar />
				<main className='w-[90vw] h-[90vh]'>{children}</main>
			</div>
		</>
	);
}

function SideNavbar() {
	return (
		<aside className='w-[10vw] h-[90vh] bg-zinc-50 border-r-[2px] border-zinc-600 flex flex-col px-[2vw] py-[5vh] gap-[2.5vh]'>
			<Link href='/admin/xiBX/dashboard'>Dashboard</Link>

			<Link href='/admin/xiBX/dashboard/users'>Users</Link>

			<Link href='/admin/xiBX/dashboard/register'>Register</Link>

			<Link href='/admin/xiBX/dashboard/projects'>Projects</Link>

		</aside>
	);
}

function TopNavbar() {
	return (
		<nav className='flex items-center justify-between px-[5vw] h-[10vh] bg-zinc-50 border-b-[2px] border-zinc-500'>
			{" "}
			<span className='text-2xl font-semibold '>Time Master</span>{" "}
			<div className='flex gap-2 items-center text-xl'>
				<CircleUser height={32} width={32} />
				Username <AlignJustify height={32} width={32} />{" "}
			</div>
		</nav>
	);
}
