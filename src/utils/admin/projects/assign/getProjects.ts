import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";

const getProjects = async () => {
	try {
		const response = await fetch(`${SERVER_URL}/api/v1/projects`, {
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
		return data.projects;
	} catch (error) {
		return error;
	}
};

export { getProjects };