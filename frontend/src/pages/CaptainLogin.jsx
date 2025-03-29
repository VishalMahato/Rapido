import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [CaptainData, setCaptainData] = useState({});

	const submitHandler = (e) => {
		e.preventDefault();
		setUserData({
			email: email,
			password: password,
		});
		// console.log(userData);

		setEmail("");
		setPassword("");
	};

	return (
		<>
			<div className="p-5 flex flex-col justify-between h-screen">
				<div>
					<img
						className="cover w-20 mb-10 "
						src="https://imgs.search.brave.com/exYdUgItfG2uOaesGrC7YcSDcWafZAAWXEQW6Q9SzLs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA5/L1JhcGlkby1Mb2dv/LTUwMHgyODEucG5n"
						alt=""
					/>
					<form
						onSubmit={(e) => {
							submitHandler(e);
						}}
					>
						<h3 className="text-lg font-medium mb-2">What's your email</h3>
						<input
							className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-full  mb-5"
							required
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder="email@example.com"
							type="email"
						/>
						<h3 className="text-lg font-medium mb-2">Enter Password</h3>
						<input
							className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-full  mb-5"
							required
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							placeholder="password"
							type="password"
						/>
						<button className=" mb-0.5 rounded py-3 w-full text-2xl bg-black text-white font-semibold my-2">
							Login
						</button>
						<p className=" mb-1.5 text-sm">
						Start your fleet? {" "}
							<Link className="text-amber-600 font-semibold " to="/captain-signup">
								Register as Captain
							</Link>{" "}
						</p>
					</form>
				</div>

				<div>
					<Link
						to="/login"
						className="flex items-center justify-center bg-[#5f9ea0]  rounded py-3 w-full text-2xl mb-10 bg-b text-slate-50 font-semibold my-2"
					>
						Sign in as User
					</Link>
				</div>
			</div>
		</>
	);
};

export default CaptainLogin;
