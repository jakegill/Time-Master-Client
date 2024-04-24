"use client";
import PageWrapper from "@/components/PageWrapper";
import SideNavbarDesktop from "@/components/employees/SideNavbarDesktop";
import TopNavbar from "@/components/employees/TopNavbar";

export default function EmloyeeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col xl:flex-row h-[100svh]">
			<TopNavbar />
			<SideNavbarDesktop />
			<PageWrapper>{children}</PageWrapper>
		</div>
	);
}
