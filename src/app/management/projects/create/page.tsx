"use client";
import { useState } from "react";
import Breadcrumb from "@/components/management/Breadcrumb";
import { IconArrowLeft, IconArrowRight, IconLoader2 } from "@tabler/icons-react";
import Link from "next/link";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";

export default function ManagementCreateProject() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [currStep, setCurrStep] = useState(1);
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");

	const handleSubmitClick = async () => {
		if (!projectName) {
			alert("Please provide a project name.");
			return;
		}
		try {
			setIsLoading(true);

			const response = await fetch(`${SERVER_URL}/api/v1/projects`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
				body: JSON.stringify({
					projectName,
					projectDescription,
				}),
			});

			if (response.ok) {
				setCurrStep(currStep + 1);
				setIsSuccess(true);
				setProjectName("");
				setProjectDescription("");
			}
		} catch (error) {
			alert("An error occurred. Please try again.");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="xl:w-[50%] w-full h-full flex flex-col">
				<div className="py-2">
					<Breadcrumb currentStep={currStep} />
				</div>

				<div className="flex flex-col justify-between w-full h-full pt-1 pb-3 text-md">
					<div>
						<h3 className="pb-1 text-neutral-medium">Provide a title & description</h3>
						<div className="flex flex-col gap-4">
							<div>
								<label className="py-4 text-sm font-semibold font-neutral-medium" htmlFor="email-input">
									Project Name
								</label>
								<div>
									<input
										onChange={(e) => setProjectName(e.target.value)}
										value={projectName}
										className="px-4 py-2 border-[1px] border-neutral-light bg-neutral-white rounded-md shadow-sm w-full focus:outline-none"
										id="title-input"
										type="text"
									/>
									<p className="text-xs text-neutral-medium">Required</p>
								</div>
							</div>
							<div>
								<label className="py-4 text-sm font-semibold font-neutral-medium" htmlFor="email-input">
									Project Description
								</label>
								<div>
									<input
										onChange={(e) => setProjectDescription(e.target.value)}
										value={projectDescription}
										className="px-4 py-2 border-[1px] border-neutral-light bg-neutral-white rounded-md shadow-sm w-full focus:outline-none"
										id="description-input"
										type="text"
									/>
									<p className="text-xs text-neutral-medium">Optional</p>
								</div>
							</div>
							<p className="text-accent-green-dark">{isSuccess ? "Successfully created project" : ""}</p>
						</div>
					</div>
					<div className="flex justify-between">
						<Link
							href="/management/projects"
							className="flex gap-2 text-accent-red-dark px-2 py-1 bg-accent-red-lightest border-[1px] border-accent-red-light rounded-md"
						>
							<IconArrowLeft />
							Cancel
						</Link>
						<button
							onClick={handleSubmitClick}
							className="rounded-md flex gap-2 px-2 py-1 bg-accent-green-lightest border-[1px] border-accent-green-light text-green-dark"
						>
							{isLoading ? <IconLoader2 className="animate-spin" /> : "Submit"}
							<IconArrowRight />
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
