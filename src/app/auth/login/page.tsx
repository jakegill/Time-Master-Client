"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { SERVER_URL } from "@/config/constants.config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Token } from "@/types/token";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
	password: z
		.string()
		.min(6, "Password should contain at least 6 characters.")
		.max(30, "Password should contain at most 30 characters."),
});

type InputType = z.infer<typeof loginSchema>;

export default function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputType>({ resolver: zodResolver(loginSchema) });

	// TODO Implement some kind of success indicator.
	const loginUser: SubmitHandler<InputType> = async (formData) => {
		try {
			setIsLoading(true);

			const { ...user } = formData;

			const response = await fetch(`${SERVER_URL}/api/v1/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: user.email,
					password: user.password,
				}),
			});

			const data = await response.json();
			console.log(data);
			Cookies.set("token", data.token, { secure: true, sameSite: "strict", path: "/" });

			const decodedToken: Token = jwtDecode(data.token);
			console.log(decodedToken);

			if (decodedToken.role === "employee") {
				router.push("/employee/home");
			} else if (decodedToken.role === "manager") {
				router.push("/admin/dashboard");
			} else if (decodedToken.role === "admin") {
				router.push("/admin/dashboard");
			} else if (decodedToken.role === "superAdmin") {
				router.push("/superadmin/home");
			}

			setIsLoading(false);
		} catch (error: any) {
			console.log(error);
			setIsLoading(false);
		}
	};

	return (
		<div className="w-[100vw] h-[100vh] bg-[#f5f3f4] py-[15vh]">
			<div className="flex flex-col max-w-md min-w-xs mx-auto">
				<h2 className="py-[1vh]">Safety & Quality Control</h2>
				<form className="bg-white rounded px-8 pt-6 pb-4 shadow-md" onSubmit={handleSubmit(loginUser)}>
					<div className="mb-3">
						<h2 className="text-2xl mb-5">Log in</h2>
						<div className="h-[100%] flex flex-col gap-[2vh] mb-[2vh]">
							<div className="">
								<label className="block text-zinc-700 text-sm mb-1" htmlFor="username">
									Email
								</label>
								<input
									{...register("email")}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder=""
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
						</div>
						<div className="flex flex-col gap-2">
							{isLoading ? (
								<div className="flex justify-center">Loading...</div>
							) : (
								<button
									className="bg-blue-700 py-2 text-white transition hover:bg-blue-800 hover:shadow-sm"
									type="submit"
								>
									Log in
								</button>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}