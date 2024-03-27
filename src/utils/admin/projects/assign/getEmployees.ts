import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";

const getEmployees = async () => {
	try {
		const response = await fetch(`${SERVER_URL}/api/v1/employees`, {
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
		return data.employees;
	} catch (error) {
		return error;
	}
};

export { getEmployees };