import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUserData } = useContext(UserDataContext);
	const navigate = useNavigate();
	// console.log("line 11")
	const submitHandler = async (e) => {
		e.preventDefault();

		const user = {
			email: email,
			password: password,
		};
		// console.log("ye kya ho raha ");
		const response = await axios.post(
			`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
			user,
			{ withCredentials: true }
		);

		// console.log(response.status , "response status");
		// console.log(response.headers["set-cookie"], "response print ")
		if (response.status === 200) {
			console.log("Navigating to home");
			navigate("/home");
		}

		setUserData(user);
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
						onSubmit={submitHandler}
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
							New here?{" "}
							<Link className="text-blue-600" to="/signup">
								Create Account
							</Link>{" "}
						</p>
					</form>
				</div>

				<div>
					<Link
						to="/captain-login"
						className="flex items-center justify-center  rounded py-3 w-full text-2xl mb-10 bg-amber-300 text-slate-50 font-semibold my-2"
					>
						Sign in as Captain
					</Link>
				</div>
			</div>
		</>
	);
};

export default UserLogin;
