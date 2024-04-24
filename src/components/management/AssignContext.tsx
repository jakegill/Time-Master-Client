import type { Project } from "@/types/project";
import type { Employee } from "@/types/user";
import { createContext, useContext, useState, ReactNode } from "react";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";

interface AssignContext {
	selectedProject: Project | undefined;
	setSelectedProject: (project: Project) => void;
	selectedEmployees: string[];
	setSelectedEmployees: (employees: string[]) => void;
	handleAssignClick: () => void;
	isUploading: boolean;
	isSuccess: boolean;
	isError: boolean;
}

export const AssignContext = createContext<AssignContext>({
	selectedProject: undefined,
	selectedEmployees: [],
	setSelectedProject: () => {},
	setSelectedEmployees: () => {},
	handleAssignClick: () => {},
	isSuccess: false,
	isUploading: false,
	isError: false,
});

export const useAssign = () => useContext(AssignContext);

export const AssignContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedProject, setSelectedProject] = useState<Project>();
	const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleAssignClick = async () => {
		if (!selectedProject) {
			alert("Please select a project to assign")
			return;
		}
		try {
			setIsUploading(true);
			const res = await fetch(`${SERVER_URL}/api/v1/projects/assign`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
				body: JSON.stringify({
					employees: selectedEmployees,
					project: selectedProject,
				}),
			});
			if (!res.ok) {
				setIsError(true);
			} else {
				setIsSuccess(true);
				window.location.reload();
			}
		} catch (e) {
			console.log(e);
		} finally {
			setIsUploading(false);
		}
	};

	const value = {
		selectedProject,
		setSelectedProject,
		selectedEmployees,
		setSelectedEmployees,
		handleAssignClick,
		isUploading,
		isSuccess,
	};

	//@ts-ignore
	return <AssignContext.Provider value={value}>{children}</AssignContext.Provider>;
};