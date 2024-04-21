"use client";
import type { Project } from "@/types/project";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";
import { SearchContextProvider, useSearch } from "@/components/SearchContext";
import SearchProject from "@/components/management/SearchProject";

export default function ManagementForms() {
	return (
		<SearchContextProvider>
			<Page />
		</SearchContextProvider>
	);
}

function Page() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { setSearchData, searchResults } = useSearch();

	useEffect(() => {
		(async () => {
			const response = await fetch(`${SERVER_URL}/api/v1/projects`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
			});
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setProjects(data.projects);
				setIsLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		setSearchData(projects);
	}, [projects]);

	const handleDeleteProject = async (projectId: string) => {
		const newForms = projects.filter((project) => project._id !== projectId);
		setProjects(newForms);
		try {
			const response = await fetch(`${SERVER_URL}/projects/${projectId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
			});
			const data = await response.json();
			console.log(data);

			if (!response.ok) {
				throw new Error("Failed to delete form.");
			}
		} catch (error) {
			console.error("Error deleting form.", error);
		}
	};

	return (
		<>
			<h2 className="py-2 text-xl text-neutral-dark">Manage Projects</h2>
			<SearchProject />
			<div className="h-full overflow-y-scroll">
				{isLoading ? (
					<div className="flex items-center justify-center w-full h-full">
						<IconLoader2 className="animate-spin" />
					</div>
				) : (
					<div className="flex flex-col w-full py-4 xl:max-w-[50%]">
						{searchResults.map((project: Project) => (
							<div
								key={project._id}
								className="truncate flex justify-between w-full px-2 py-1 bg-neutral-white text-neutral-dark border-[1px] border-neutral-light"
							>
								{`${project.projectName}`}
								<div className="flex gap-2">
									<IconTrash
										className="rounded-lg cursor-pointer hover:bg-accent-red-lightest"
										color="hsl(356, 75%, 53%)"
										onClick={() => handleDeleteProject(project._id)}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
