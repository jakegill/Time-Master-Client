"use client";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";
import { format } from "date-fns";

export default function EmployeeTimelogs() {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [timelogs, setTimelogs] = useState([]);

	const getTimelogs = async () => {
		try {
			const res = await fetch(`${SERVER_URL}/api/v1/employee/timelogs`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				console.log(data);
				setTimelogs(data.timelogs);
				setIsLoading(false);
			}
		} catch (e) {
			console.log(e);
			setIsError(true);
		}
	};

	useEffect(() => {
		getTimelogs();
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading timelogs.</div>;

	return (
		<div>
			<h2 className="text-neutral-medium text-lg pb-2">My Timelogs</h2>
			<div className="max-h-[80svh] w-full overflow-y-scroll">
				<div className="grid grid-cols-[0.2fr_0.2fr_0.2fr_0.4fr]">
					<h3 className="text-neutral-darkest font-semibold border-x-[1px] border-y-[1px] border-neutral-dark px-1 flex items-center justify-center">
						Date
					</h3>
					<h3 className="text-neutral-darkest font-semibold border-x-[1px] border-y-[1px] border-neutral-dark px-1 flex items-center justify-center">
						In
					</h3>
					<h3 className="text-neutral-darkest font-semibold border-x-[1px] border-y-[1px] border-neutral-dark px-1 flex items-center justify-center">
						Out
					</h3>
					<div></div>
				</div>
				<>
					{timelogs.map((log) => (
						<div className="grid grid-cols-[0.2fr_0.2fr_0.2fr_0.4fr]" key={log._id}>
							<div className="border-x-[1px] border-y-[1px] border-neutral-dark px-1 flex items-center justify-center">
								{format(new Date(log.clockIn), "MM dd")}
							</div>
							<div className="border-x-[1px] border-y-[1px] border-neutral-dark px-1 flex items-center justify-center">
								{format(new Date(log.clockIn), "HH:mm")}
							</div>
							<div className="border-x-[1px] border-y-[1px] border-neutral-dark px-1 flex items-center justify-center">
								{log.clockOut ? format(new Date(log.clockOut), "HH:mm") : "---"}
							</div>
							<button
								onClick={() => alert("Edit requested.")}
								className="text-primary-medium text-sm flex align-left px-1 items-center"
							>
								Request edit
							</button>
						</div>
					))}
				</>
			</div>
		</div>
	);
}
