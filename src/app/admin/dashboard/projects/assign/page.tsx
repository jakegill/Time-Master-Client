"use client";
import { useEffect, useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { getEmployees } from "@/utils/admin/projects/assign/getEmployees";
import { getProjects } from "@/utils/admin/projects/assign/getProjects";
import { assignProject } from "@/utils/admin/projects/assign/assignProject";
import { Project } from "@/types/project";
import { Employee } from "@/types/user";


export default function AssignUsersPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

    const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                setEmployees(await getEmployees());
                setProjects(await getProjects());
            } catch (error: any) {
                setError(error?.message);
            } finally {
                setIsLoadingEmployees(false);
                setIsLoadingProjects(false);
            }
        })();
    }, []);

    const toggleEmployeeSelection = (employeeId: string) => {
        setSelectedEmployees((prevSelectedEmployees) => {
            const isAlreadySelected = prevSelectedEmployees.find((employee) => employee._id === employeeId);
            if (isAlreadySelected) {
                return prevSelectedEmployees.filter((employee) => employee._id !== employeeId);
            } else {
                const employeeToAdd = employees.find((employee) => employee._id === employeeId);
                return employeeToAdd ? [...prevSelectedEmployees, employeeToAdd] : [...prevSelectedEmployees];
            }
        });
    };

    return (
        <>
            <div className="grid grid-rows-[0.25fr_4fr] h-full">
                <div className="h-full grid grid-cols-[0.5fr_0.5fr] grid-rows-[0.05fr_0.90fr_0.05fr] gap-x-[4vw]">
                    <p className="text-xl">Select a project</p>
                    <p onClick={() => {console.log(employees)}}className="text-xl">Select employees to assign</p>
                    <div className="h-full w-full grid auto-rows-[5vh]">
                        <select
                            className={`${projects.length === 0 ? "hidden" : "focus:outline-none border-[1px] border-zinc-200 px-[2vw] w-full"}`}
                            value={selectedProject ? selectedProject._id : ""}
                            onChange={(e) => {
                                const project = projects.find((project) => project._id === e.target.value);
                                setSelectedProject(project || null);
                            }}
                        >
                            <option value="" disabled>Select a project</option>
                            {Array.isArray(projects) && projects.map((project) => (
                                <option className="p-4" key={project._id} value={project._id}>{project.projectName}</option>
                            ))}
                        </select>

                        {isLoadingProjects && (
                            <div className="w-full h-full flex items-center justify-center">
                                {/* Loader Component or Icon */}
                            </div>
                        )}
                    </div>
                    <div className="h-full w-full grid auto-rows-[5vh]">
                        {Array.isArray(employees) && employees.map((employee) => (
                            <div
                                key={employee._id}
                                onClick={() => toggleEmployeeSelection(employee._id)}
                                className={`flex transition duration-300 items-center gap-[1vw] px-[1vw] py-[1vh] w-full border-[1px] ${
                                    selectedEmployees.find((selectedEmployee) => selectedEmployee._id === employee._id)
                                        ? "bg-blue-100 border-blue-400"
                                        : "border-zinc-300 bg-white"
                                }`}
                            >
                                <input
                                    onChange={() => toggleEmployeeSelection(employee._id)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="h-[1.5vh] w-[1.5vh]"
                                    type="checkbox"
                                    checked={!!selectedEmployees.find((selectedEmployee) => selectedEmployee._id === employee._id)}
                                />
                                <h2 className="text-sm">{employee.name}</h2>
                            </div>
                        ))}
                        {isLoadingEmployees && (
                            <div className="w-full h-full flex items-center justify-center">
                                {/* Loader Component or Icon */}
                            </div>
                        )}
                    </div>
                    {selectedProject && (
                        <div className="w-full flex justify-start">
                            <button
                                onClick={() => {
                                    assignProject(selectedProject, selectedEmployees);
                                }}
                                className="mt-2 text-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
