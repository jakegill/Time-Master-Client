export default function PageWrapper({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col w-full h-full px-6 xl:px-24 py-2 xl:py-8 bg-neutral-lightest">{children}</div>;
}