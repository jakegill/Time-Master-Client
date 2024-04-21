import TopNavbar from "@/components/management/TopNavbar";
import PageWrapper from "@/components/PageWrapper";
import SideNavbarDesktop from "@/components/management/SideNavbarDesktop";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col xl:flex-row h-[100svh]">
			<TopNavbar />
			<SideNavbarDesktop />
			<PageWrapper>{children}</PageWrapper>
		</div>
	);
}
