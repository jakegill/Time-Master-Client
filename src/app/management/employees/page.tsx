"use client";
import type { Employee } from "@/types/user";
import { IconLoader2, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";
import SearchEmployee from "@/components/management/SearchEmployee";
import { SearchContextProvider, useSearch } from "@/components/SearchContext";

export default function ManagementEmployees() {
	return (
		<SearchContextProvider>
			<Page />
		</SearchContextProvider>
	);
}

function Page() {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { setSearchData, searchResults } = useSearch();

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

	const handleDeleteClick = async (employeeId: string) => {
		const newEmployees = employees.filter((employee) => employee._id !== employeeId);
		setEmployees(newEmployees);
		try {
			const response = await fetch(`${SERVER_URL}/users/${employeeId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to delete employee.");
			}
		} catch (error) {
			console.error("Error deleting employee.", error);
		}
	};

	return (
		<>
			<h2 className="py-2 text-xl text-neutral-dark">Manage Employees</h2>
			<SearchEmployee />
			<div className="h-full overflow-y-scroll">
				{isLoading ? (
					<div className="flex items-center justify-center w-full h-full">
						<IconLoader2 className="animate-spin" />
					</div>
				) : (
					<div className="flex flex-col w-full py-4 xl:max-w-[50%]">
						{searchResults.map((employee: Employee) => (
							<div
								key={employee._id}
								className="truncate flex justify-between w-full px-2 py-1 bg-neutral-white text-neutral-dark border-[1px] border-neutral-light"
							>
								{`${employee.name}`}
								<div className="flex gap-2">
									<IconTrash
										className="rounded-lg cursor-pointer hover:bg-accent-red-lightest"
										color="hsl(356, 75%, 53%)"
										onClick={() => handleDeleteClick(employee._id)}
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
