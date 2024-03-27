"use client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import { IconMenu, IconHome, IconArrowBackUp } from "@tabler/icons-react";
import Link from "next/link";

export default function InspectorLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const decodedToken: {
		tenantName: string;
	} = jwtDecode(Cookies.get("token") as string);

	const pathname = usePathname();

	return (
		<div className="w-[100vw] h-[100vh]">
			<div className="grid grid-cols-[0.2fr_0.6fr_0.2fr] h-[8vh] w-full bg-[#212529] text-white border-darkest/10 justify-around items-center p-2 ">
				<div className="flex justify-center items-center">
					{pathname === "/employee/home" ? (
						<IconHome />
					) : (
						<Link href="/employee/home">
							<IconArrowBackUp />
						</Link>
					)}
				</div>
				<div className="w-full flex justify-center items-center">
					<h1 className="text-xl">{decodedToken.tenantName}</h1>
				</div>
				<button className="flex justify-center items-center">
					<IconMenu />
				</button>
			</div>
			<div className="h-[92vh] w-full px-[2vw] py-[1vh]">{children}</div>
		</div>
	);
}