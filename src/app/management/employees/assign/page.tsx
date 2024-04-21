"use client";
import type { Employee } from "@/types/user";
import type { Project } from "@/types/project";
import { useEffect, useState } from "react";
import { useSearch, SearchContextProvider } from "@/components/SearchContext";
import SearchEmployee from "@/components/management/SearchEmployee";
import SearchProject from "@/components/management/SearchProject";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";
import { IconLoader2, IconCheck } from "@tabler/icons-react";
import { AssignContextProvider, useAssign } from "@/components/management/AssignContext";

export default function ManagementEmployeesAssign() {
	return (
		<AssignContextProvider>
			<Page />
		</AssignContextProvider>
	);
}

function Page() {
	const {
		isUploading,
		isSuccess,
		isError,
		selectedProject,
		setSelectedProject,
		setSelectedEmployees,
		handleAssignClick,
	} = useAssign();

	useEffect(() => {
		if (selectedProject && selectedProject.assignees) {
			const prevSelected = selectedProject.assignees;
			setSelectedEmployees([...prevSelected]);
		} else {
			setSelectedEmployees([]);
		}
	}, [selectedProject]);

	return (
		<div className="h-full xl:flex xl:flex-col xl:space-between">
			<div className="flex flex-col w-full h-full gap-2 xl:grid xl:grid-cols-2 xl:gap-8">
				<SearchContextProvider>
					<SearchForms />
				</SearchContextProvider>
				<SearchContextProvider>
					<SearchEmployees />
				</SearchContextProvider>
				<div className="flex justify-start gap-2 xl:hidden">
					<button
						onClick={handleAssignClick}
						className="px-2 py-1 bg-primary-medium hover:bg-primary-dark border-[1px] rounded-md shadow-sm border-primary-dark text-neutral-white "
					>
						{isUploading ? <IconLoader2 className="animate-spin" /> : "Assign"}
					</button>
					{isSuccess && (
						<>
							<p className="flex items-center gap-2 text-accent-green-dark">
								<IconCheck /> Success
							</p>
						</>
					)}
					{isError && <p className="flex items-center text-accent-red-medium">Failed</p>}
				</div>
			</div>
			<div className="justify-start hidden gap-2 xl:flex">
				<button
					onClick={handleAssignClick}
					className="px-2 py-1 bg-primary-medium hover:bg-primary-dark border-[1px] rounded-md shadow-sm border-primary-dark text-neutral-white "
				>
					{isUploading ? <IconLoader2 className="animate-spin" /> : "Assign"}
				</button>
				{isSuccess && (
					<>
						<p className="flex items-center gap-2 text-accent-green-dark">
							<IconCheck /> Success
						</p>
					</>
				)}
				{isError && <p className="flex items-center text-accent-red-medium">Failed</p>}
			</div>
		</div>
	);
}

function SearchForms() {
	const { setSearchData, searchResults } = useSearch();
	const { selectedProject, setSelectedProject } = useAssign();
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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
				setProjects(data.projects);
				setIsLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		setSearchData(projects);
	}, [projects]);

	return (
		<>
			<div className="flex flex-col gap-1 xl:gap-4">
				<h2 className="text-neutral-dark xl:text-lg">Select Projects</h2>
				<div className="flex flex-col gap-1 xl:gap-4">
					<SearchProject />
					<div className="h-[30svh] xl:h-full overflow-y-scroll">
						{isLoading ? (
							<div className="flex items-center justify-center w-full h-full">
								<IconLoader2 className="animate-spin" />
							</div>
						) : (
							<div className="flex flex-col w-full py-1">
								{searchResults.map((project: Project) => (
									<label
										key={project._id}
										className={`truncate flex items-center gap-2 w-full px-2 py-1 border-[1px] ${
											selectedProject?._id === project._id
												? "bg-primary-lightest text-primary-dark border-primary-light"
												: "bg-neutral-white text-neutral-dark border-neutral-light"
										}`}
									>
										<input
											type="radio"
											name="select-form"
											value={project._id}
											checked={selectedProject?._id === project._id}
											onChange={() => setSelectedProject(project)}
										/>
										{project.projectName}
									</label>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

function SearchEmployees() {
	const { setSearchData, searchResults } = useSearch();
	const { selectedEmployees, setSelectedEmployees } = useAssign();
	const [employees, setEmployees] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const response = await fetch(`${SERVER_URL}/api/v1/employees`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setEmployees(data.employees);
				setIsLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		setSearchData(employees);
	}, [employees]);

	return (
		<>
			<div className="flex flex-col gap-1 xl:gap-4">
				<h2 className="text-neutral-dark xl:text-lg">Select Employees</h2>
				<div className="flex flex-col gap-1 xl:gap-4">
					<SearchEmployee />
					<div className="h-[30svh] xl:h-full overflow-y-scroll">
						{isLoading ? (
							<div className="flex items-center justify-center w-full h-full">
								<IconLoader2 className="animate-spin" />
							</div>
						) : (
							<div className="flex flex-col w-full py-1">
								{searchResults.map((employee: Employee) => (
									<label
										key={employee._id}
										className={`truncate flex items-center gap-2 w-full px-2 py-1 border-[1px] ${
											selectedEmployees?.includes(employee._id)
												? "bg-primary-lightest border-primary-light text-primary-dark"
												: "bg-neutral-white text-neutral-dark border-neutral-light"
										}`}
									>
										<input
											type="checkbox"
											checked={selectedEmployees?.includes(employee._id)}
											onChange={() => {
												const prevSelected = selectedEmployees;
												if (prevSelected.includes(employee._id)) {
													setSelectedEmployees(prevSelected.filter((id) => id !== employee._id));
													return;
												}
												setSelectedEmployees([...prevSelected, employee._id]);
											}}
										/>
										{`${employee.name}`}
									</label>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
