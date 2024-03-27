"use client";

export default function CreateFormLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<>
			<div className="grid grid-rows-[0.25fr_4fr] h-full">
				<div className="grid grid-cols-[0.5fr_0.5fr]  gap-[4vw]">
					<h1 className="text-3xl">Create a Project</h1>{" "}
				</div>
				<>{children}</>
			</div>
		</>
	);
}