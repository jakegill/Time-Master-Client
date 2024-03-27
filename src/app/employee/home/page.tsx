"use client";
import { IconListCheck, IconFileDescription } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getProjects } from "@/utils/employee/projects/getProjects";
import { IconChevronRight } from "@tabler/icons-react";
import type { Project } from "@/types/project";
import Link from "next/link";

export default function InspectorHome() {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		(async () => {
			const token = Cookies.get("token");
			if (token) {
				const decodedToken: { id: string } = jwtDecode(token);
				const projects = await getProjects(decodedToken.id);
				setProjects(projects);
			}
		})();
	}, []);

	return (
		<div className="h-full grid grid-rows-[0.5fr_0.5fr]">
			<div className="max-h-[40vh]">
				<div className="flex gap-[1vw] items-center font-semibold h-[4vh]">
					<IconListCheck />
					<h2>My Projects</h2>
				</div>
				<div className="max-h-full overflow-y-scroll">
					{Array.isArray(projects) &&
						projects.map((project) => (
							<Link
								href={`/inspector/form/${project._id}`}
								key={project._id}
								className="flex justify-between items-center border-b border-darkest/10 p-2"
							>
								<h3>{project.projectName}</h3>
								<IconChevronRight />
							</Link>
						))}
				</div>
			</div>
		</div>
	);
}