"use client";
import { IconLoader2 } from "@tabler/icons-react";
import { SERVER_URL } from "@/config/constants.config";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";

export default function ManagementAnalytics() {
	const [timelogs, setTimelogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const getTimelogs = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/api/v1/management/timelogs`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setTimelogs(data.timelogs);
				console.log(data);
			}
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getTimelogs();
	}, []);

	if (isLoading)
		return (
			<div className="h-full w-full flex items-center justify-center">
				<IconLoader2 className="animate-spin" />
			</div>
		);

	return (
		<div>
			<h1 className="py-2 text-xl text-neutral-dark">Manage Timelogs</h1>
			<div className="w-full max-h-[80svh] overflow-y-scroll">
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
					<h3 className="text-neutral-darkest font-semibold border-x-[1px] border-y-[1px] border-neutral-dark px-1 flex items-center justify-center">
						Employee ID
					</h3>
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
							<div className="truncate border-x-[1px] border-y-[1px] border-neutral-dark px-1 flex items-center justify-center">
								{log?.employeeId || log.employee}
							</div>
						</div>
					))}
				</>
			</div>
		</div>
	);
}
