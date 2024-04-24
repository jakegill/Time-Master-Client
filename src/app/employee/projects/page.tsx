"use client";
import { useState, useEffect } from "react";
import { SERVER_URL } from "@/config/constants.config";
import type { Project } from "@/types/project";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { IconLoader2 } from "@tabler/icons-react";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";

export default function EmployeeProjectId() {
	const [project, setProject] = useState<Project>();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isClockedIn, setIsClockedIn] = useState(false);
	const params = useSearchParams();

	const getProject = async () => {
		try {
			const res = await fetch(`${SERVER_URL}/api/v1/projects/${params.get("p")}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				console.log(data);
				setProject(data.project);

				// Determine if the current user is clocked in. TODO fix 
				const token = Cookies.get("token");
				const decode = jwtDecode(token);
				const currEmployee = decode.id;
				const latestTimelog = data.project.timelogs
					.filter((log) => log.employee === currEmployee && !log.clockOut)
					.pop();

				if (latestTimelog) {
					console.log("User is currently clocked in.");
					setIsClockedIn(true);
				} else {
					console.log("User is not clocked in.");
					setIsClockedIn(false);
				}
			}
		} catch (e) {
			console.log(e);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	// All dates will be handled server-side. auth token will know which user to clock in/out.
	const handleClockIn = async () => {
		try {
			const res = await fetch(`${SERVER_URL}/api/v1/projects/${params.get("p")}/clock-in`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				console.log(data);
				window.location.reload();
			}
		} catch (e) {
			console.log(e);
			setIsError(true);
		}
	};

	const handleClockOut = async () => {
		try {
			console.log("Clocking out...");
			const res = await fetch(`${SERVER_URL}/api/v1/projects/${params.get("p")}/clock-out`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				console.log(data);
				//refresh page
				window.location.reload();
			}
		} catch (e) {
			console.log(e);
			setIsError(true);
		}
	};

	useEffect(() => {
		getProject();
	}, []);

	if (isLoading) {
		return (
			<div className="h-full w-full flex items-center justify-center">
				<IconLoader2 className="animate-spin" />
			</div>
		);
	}

	return (
		<div className="h-full w-full grid grid-rows-[0.2fr_0.8fr] xl:max-w-[50%]">
			<div className="flex flex-col">
				<h1 className="font-semibold text-neutral-dark text-2xl">{project?.projectName}</h1>
				<p className="text-neutral-medium">{project?.projectDescription}</p>
			</div>
			<div className="flex flex-col gap-12">
				<time className="text-3xl text-neutral-medium">{format(new Date(Date.now()), "MMMM dd, HH:mm")}</time>

				{!isClockedIn ? (
					<button
						onClick={handleClockIn}
						className="px-4 py-2 bg-primary-medium hover:bg-primary-dark text-neutral-lightest border-primary-dark transition rounded-md"
					>
						Clock In
					</button>
				) : (
					<button
						onClick={handleClockOut}
						className="px-4 py-2 bg-primary-medium hover:bg-primary-dark text-neutral-lightest border-primary-dark transition rounded-md"
					>
						Clock Out
					</button>
				)}
			</div>
		</div>
	);
}
