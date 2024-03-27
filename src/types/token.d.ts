import type { JwtPayload } from "jwt-decode";

export interface Token extends JwtPayload {
    id: string,
    role: string,
    tenantName: number;
}