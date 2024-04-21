"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { IconLoader2, IconEye, IconEyeOff } from "@tabler/icons-react";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const registerSchema = z.object({
		email: z.string().email(),
		name: z.string().min(1).max(30),
		role: z.enum(["employee", "manager", "admin"]),
		password: z.string().min(6).max(30),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<InputType>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			role: "employee",
		},
	});

	type InputType = z.infer<typeof registerSchema>;

	const registerUser: SubmitHandler<InputType> = async (registerForm) => {
		try {
			setIsLoading(true);

			const response = await fetch(`${SERVER_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${Cookies.get("token")}`,
				},

				body: JSON.stringify({
					email: registerForm.email,
					name: registerForm.name,
					password: registerForm.password,
					role: registerForm.role,
				}),
			});
			const data = await response.json();

			if (response.ok) {
				setSuccess(true);
			} else {
				setError(true);
			}

			setIsLoading(false);
		} catch (error: any) {
			console.error(error);
			setIsLoading(false);
			setSuccess(false);
			setError(true);
		}
	};

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	return (
		<div className="flex flex-col h-full gap-6">
			<form onSubmit={handleSubmit(registerUser)} className="flex flex-col gap-4">
				<div>
					<label className="py-4 text-sm font-semibold font-neutral-medium" htmlFor="email-input">
						Email
					</label>
					<input
						{...register("email")}
						className="px-4 py-2 border-[1px] border-neutral-light bg-neutral-white rounded-md shadow-sm w-full focus:outline-none"
						id="email-input"
						type="email"
						onChange={() => {
							setError(false);
							setSuccess(false);
						}}
					/>
				</div>
				<div>
					<label className="py-4 text-sm font-semibold font-neutral-medium" htmlFor="email-input">
						Name
					</label>
					<input
						{...register("name")}
						className="px-4 py-2 border-[1px] border-neutral-light bg-neutral-white rounded-md shadow-sm w-full focus:outline-none"
						id="name-input"
						type="text"
						onChange={() => {
							setError(false);
							setSuccess(false);
						}}
					/>
				</div>
				<div>
					<label className="py-4 text-sm font-semibold font-neutral-medium" htmlFor="email-input">
						Role
					</label>
					<select
						{...register("role")}
						className="px-4 py-2 border-[1px] border-neutral-light bg-neutral-white rounded-md shadow-sm w-full focus:outline-none"
						id="role-input"
						onChange={() => {
							setError(false);
							setSuccess(false);
						}}
					>
						<option value="employee">Employee</option>
						<option value="manager">Manager</option>
						<option value="admin">Admin</option>
					</select>
				</div>
				<div>
					<label className="py-4 text-sm font-semibold font-neutral-medium" htmlFor="password-input">
						Password
					</label>
					<div className="flex w-full px-4 py-2 border-[1px] border-neutral-light bg-neutral-white rounded-md shadow-sm ">
						<input
							{...register("password")}
							className="w-full focus:outline-none"
							id="password-input"
							type={showPassword ? "text" : "password"}
							onChange={() => setError(false)}
						/>
						{showPassword ? (
							<IconEyeOff color={"hsl(211, 10%, 53%)"} className="hover:cursor" onClick={togglePasswordVisibility} />
						) : (
							<IconEye color={"hsl(211, 10%, 53%)"} className="hover:cursor" onClick={togglePasswordVisibility} />
						)}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<button
						type="submit"
						disabled={isLoading}
						className="shadow-sm rounded-md w-full px-4 py-2 border-[1px] border-primary-darkest bg-primary-dark hover:bg-primary-darkest transition text-neutral-lightest"
					>
						{isLoading ? <IconLoader2 className="flex justify-center w-full animate-spin" /> : "Register"}
					</button>
					{error && <p className="text-accent-red-medium">Failed to register employee</p>}
					{success && <p className="text-accent-green-medium">Sucessfully registered employee</p>}
				</div>
			</form>
		</div>
	);
}