import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserSignup = () => {
	const [username, setUsername] = useState("");
	const [usernameAvailable, setUsernameAvailable] = useState(null);
	const [email, setEmail] = useState("");
	const [name, setName] = useState({
		firstName: "",
		lastName: "",
	});
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (!username) {
			setUsernameAvailable(null);
			return;
		}

		// Set a debounce timer to check username availability after 500ms
		const debounceTimer = setTimeout(() => {
			axios
				.get("http://localhost:3000/api/v1/users/check-username", {
					params: { userName: username },
				})
				.then((response) => {
					console.log("USERNAME CHECK RESPONSE:", response.data); // <-- add this to debug
					setUsernameAvailable(response.data.available);
				})
				.catch((error) => {
					console.error("Error checking username:", error);
					setUsernameAvailable(null);
				});
		}, 500);

		// Clear the timer if the username changes before 500ms is reached
		return () => clearTimeout(debounceTimer);
	}, [username]);

	const submitHandler = (e) => {
		e.preventDefault();

		// setUserData()
		// Process the form submission here
		console.log({ name, username, email, password });
	};

	return (
		<div className="p-5 flex flex-col justify-between h-screen">
			<div>
				<img
					className="cover w-20 mb-10"
					src="https://imgs.search.brave.com/exYdUgItfG2uOaesGrC7YcSDcWafZAAWXEQW6Q9SzLs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA5/L1JhcGlkby1Mb2dv/LTUwMHgyODEucG5n"
					alt="Logo"
				/>
				<form onSubmit={submitHandler}>
					<h3 className="text-lg font-medium mb-2">What's your Name</h3>
					<div className="flex justify-around">
						<input
							className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-[45%] mb-5"
							required
							value={name.firstName}
							onChange={(e) => setName({ ...name, firstName: e.target.value })}
							placeholder="First Name"
							type="text"
						/>
						<input
							className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-[45%] mb-5"
							required
							value={name.lastName}
							onChange={(e) => setName({ ...name, lastName: e.target.value })}
							placeholder="Last Name"
							type="text"
						/>
					</div>
					<h3 className="text-lg font-medium mb-2">Choose a Username</h3>
					<div className="mb-4">
						<input
							className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-full"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
							type="text"
						/>
						<div style={{ height: "1.25rem", marginTop: "0.25rem" }}>
							{username && usernameAvailable !== null && (
								<p
									style={{
										color: usernameAvailable ? "green" : "red",
										fontSize: "0.875rem", // ~14px
									}}
								>
									{usernameAvailable
										? "Username is available"
										: "Username is taken"}
								</p>
							)}
						</div>
					</div>

					<h3 className="text-lg font-medium mb-2">What's your email</h3>
					<input
						className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-full mb-5"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="email@example.com"
						type="email"
					/>
					<h3 className="text-lg font-medium mb-2">Enter Password</h3>
					<input
						className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-full mb-5"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						type="password"
					/>
					<button className="mb-0.5 rounded py-3 w-full text-2xl bg-black text-white font-semibold my-2">
						Signup
					</button>
          <p className=" mb-1.5 text-sm">
							Already have an account?{" "}
							<Link className="text-blue-600" to="/login">
								Login Here
							</Link>{" "}
						</p>
				</form>
			</div>
		</div>
	);
};

export default UserSignup;
