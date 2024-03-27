"use client";
import { useState } from "react";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";

export default function CreateProjectPage() {
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleFormSubmit = async () => {
		try {
			setIsLoading(true);
			const res = await fetch(`${SERVER_URL}/api/v1/projects`, {
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
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitted(true);
			setIsLoading(false);
		}
	};

	return (
		<div className="py-[4vh] grid grid-rows-[0.3fr_0.2fr]">
			<form className="flex flex-col gap-[2vh]" action="">
				<div className="flex flex-col gap-1">
					<label className="text-xl" htmlFor="">
						Project Name
					</label>
					<input
						onChange={(event) => {
							setProjectName(event.target.value);
						}}
						className="bg-zinc-50 border-[1px] border-zinc-300 py-2"
						type="text"
						placeholder="Enter your projects name here"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xl" htmlFor="">
						Project Description
					</label>
					<input
						onChange={(event) => {
							setProjectDescription(event.target.value);
						}}
						className="bg-zinc-50 border-[1px] border-zinc-300 py-2"
						type="text"
						placeholder="Enter a brief description for your project"
					/>
				</div>
			</form>
			<button
				onClick={handleFormSubmit}
				className="flex justify-start p-2 items-center w-[11vw] h-[6vh] bg-blue-500 text-white  text-xl"
				type="submit"
			>
				Create Project
			</button>
		</div>
	);
}
