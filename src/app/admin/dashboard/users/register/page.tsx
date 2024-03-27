"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

//TODO ADD A SUCCESS INDICATOR, ADD A ROLE FIELD.

const registerSchema = z
	.object({
		name: z.string().min(1, "Please enter a name."),
		email: z.string().email("Please enter a valid email address."),
		password: z
			.string()
			.min(6, "Password should contain at least 6 characters.")
			.max(30, "Password should contain at most 30 characters."),
		confirmPassword: z
			.string()
			.min(6, "Password should contain at least 6 characters.")
			.max(30, "Password should contain at most 30 characters."),
		role: z.string().min(1, "Please select a role."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type InputType = z.infer<typeof registerSchema>;

function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const token = Cookies.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputType>({ resolver: zodResolver(registerSchema) });

	const registerUser: SubmitHandler<InputType> = async (formData) => {
		try {
			setIsLoading(true);

			const { ...user } = formData;

			const response = await fetch(`${SERVER_URL}/api/v1/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					//prettier-ignore
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					name: user.name,
					email: user.email,
					password: user.password,
					role: user.role,
				}),
			});

			const data = await response.json();
			console.log(data);

			setIsLoading(false);
		} catch (error: any) {
			console.log(error);
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col max-w-md min-w-xs mx-auto">
			<h2 className="py-[1vh]">Timemaster Pro</h2>
			<form className="bg-white rounded px-8 pt-6 pb-8 shadow-md" onSubmit={handleSubmit(registerUser)}>
				<div className="mb-3">
					<h2 className="text-2xl mb-5">Register</h2>
					<div className="h-[100%] flex flex-col gap-[2vh] mb-[2vh]">
						<div className="">
							<label className="block text-zinc-700 text-sm mb-1" htmlFor="username">
								Name
							</label>
							<input
								{...register("name")}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="name"
								type="text"
								placeholder="Enter the employees name here"
							/>
							{errors.name ? <p className="text-red-500 text-xs">{errors.name.message}</p> : null}
						</div>
						<div className="">
							<label className="block text-zinc-700 text-sm mb-1" htmlFor="username">
								Email
							</label>
							<input
								{...register("email")}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder="Enter the employees email"
							/>
							{errors.email ? <p className="text-red-500 text-xs">{errors.email.message}</p> : null}
						</div>
						<div className="">
							<label className="block text-zinc-700 text-sm mb-1" htmlFor="password">
								Password
							</label>
							<input
								{...register("password")}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								type="password"
								placeholder=""
							/>
							{errors.password ? <p className="text-red-500 text-xs">{errors.password.message}</p> : null}
						</div>
						<div className="">
							<label className="block text-zinc-700 text-sm mb-1" htmlFor="confirmPassword">
								Confirm Password
							</label>
							<input
								{...register("confirmPassword")}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="confirmPassword"
								type="password"
								placeholder=""
							/>
							{errors.confirmPassword ? (
								<p className="text-red-500 text-xs mb-2">{errors.confirmPassword.message}</p>
							) : null}
						</div>
						<div>
							<label className="block text-zinc-700 text-sm mb-1" htmlFor="role">
								Role
							</label>
							<select className="p-2 w-full" id="role" {...register("role")}>
								<option value="">Select an account type</option>
								<option value="employee">Employee</option>
								<option value="manager">Manager</option>
								<option value="admin">Admin</option>
							</select>
							{errors.role ? <p className="text-red-500 text-xs mb-2">{errors.role.message}</p> : null}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						{isLoading ? (
							<div className="flex justify-center">Loading...</div>
						) : (
							<button
								className="bg-blue-700 py-2 text-white transition hover:bg-blue-800 hover:shadow-sm"
								type="submit"
							>
								Create Account
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
}

export default function DashboardRegisterUser() {
	return (
		<>
			<div className="grid grid-rows-[0.25fr_4fr] h-full">
				<div className="grid grid-cols-[0.5fr_0.5fr]  gap-[4vw]">
					<h1 className="text-3xl">Register a New User</h1>{" "}
				</div>
				<div>
					<RegisterForm />
				</div>
			</div>
		</>
	);
}