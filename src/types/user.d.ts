import type { Project } from "./project";

export interface Employee {
    _id: string;
    name: string;
    tenantName: string;
    role: "manager" | "employee";
    projects: Project[];
}