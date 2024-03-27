import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";

// Get all of an inspectors forms for display on the inspector home page.

const getProjects = async (employeeId: string) => {
	try {
		const response = await fetch(`${SERVER_URL}/api/v1/employees/${employeeId}/projects`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				//prettier-ignore
				"Authorization": `Bearer ${Cookies.get("token")}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch projects");
		}
		const data = await response.json();
		console.log(data);
		return data.projects;
	} catch (error) {
		return error;
	}
};

export { getProjects };