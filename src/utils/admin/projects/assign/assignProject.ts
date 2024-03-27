import type { Project } from "@/types/project";
import type { Employee } from "@/types/user";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";

/*
Used in admin dashboard -> assign form 

This function will POST the form to the backend to assign it to the selected inspectors.

*/

const assignProject = async (project: Project, employees: Employee[]) => {
	const response = await fetch(`${SERVER_URL}/api/v1/projects/assign`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			//prettier-ignore
			"Authorization": `Bearer ${Cookies.get("token")}`,
		},
		body: JSON.stringify({
			project,
			employees,
		}),
	});
	if (response.ok) {
		return response.json();
	} else {
		throw new Error("Failed to assign form to inspectors");
	}
};

export { assignProject };