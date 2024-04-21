export default function Breadcrumb({ currentStep }: { currentStep: number | 1 | 2 | 3 }) {
	return (
		<>
			<style jsx>{`
				@keyframes slideIn {
					0% {
						width: 0%;
					}
					100% {
						width: 100%;
					}
				}

				.slide-in {
					animation: slideIn 1s ease-in;
				}
			`}</style>
			<div
				className={`w-full rounded-lg h-4 grid grid-rows-1 grid-cols-2 border-[1px] border-neutral-light overflow-hidden`}
			>
				{Array.from({ length: 2 }, (_, index) => (
					<div
						key={index}
						className={`w-full h-full transition-width
                        ${currentStep > index ? "bg-primary-medium" : "bg-neutral-white"} 
                        ${currentStep === index + 1 ? "bg-primary-medium slide-in" : "bg-neutral-white"} ${
							currentStep === 1 && index === 0 ? "rounded-l-lg" : ""
						} ${index === 2 - 1 ? "rounded-r-lg" : ""}`}
					></div>
				))}
			</div>
		</>
	);
}