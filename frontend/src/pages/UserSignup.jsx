import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
	const [step, setStep] = useState(1);
	const [username, setUsername] = useState("");
	const [usernameAvailable, setUsernameAvailable] = useState(null);
	const [isUsernameValid, setIsUsernameValid] = useState(true);
	const [contactNumber, setContactNumber] = useState("");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState({ firstName: "", lastName: "" });
	const {setUserData} = useContext(UserDataContext);
	const navigate = useNavigate();

	const usernameRegex =
		/^[A-Za-z0-9_](?!.*?\.{2})[A-Za-z0-9_.]{1,28}[A-Za-z0-9_]$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
//Username Validation
	useEffect(() => {
		if (username === "") {
			setIsUsernameValid(true);
			setUsernameAvailable(null);
			return;
		}
		const valid = usernameRegex.test(username);
		setIsUsernameValid(valid);

		if (valid) {
			const debounceTimer = setTimeout(() => {
				axios
					.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/check-username`, {
						params: { userName: username },
					})
					.then((response) => {
						setUsernameAvailable(response.data.available);
					})
					.catch(() => {
						setUsernameAvailable(null);
					});
			}, 500);

			return () => clearTimeout(debounceTimer);
		} else {
			setUsernameAvailable(null);
		}
	}, [username]);

	//password comparionsion validation

	useEffect(() => {
		if (confirmPassword === "") {
			setDoPasswordsMatch(true);
		} else {
			setDoPasswordsMatch(password === confirmPassword);
		}
	}, [password, confirmPassword]);



	const submitHandler = async (e) => {
		e.preventDefault();
		if (
			!isUsernameValid ||
			!isEmailValid ||
			!isPasswordValid ||
			!doPasswordsMatch
		)
			return;

		const newUser = {
			firstName: name.firstName,
			lastName: name.lastName,
			email,
			userName: username,
			password,
			contactNumber,
		};

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
				newUser
			);

			if (response.status === 201) {
				const data = response.data;
				setUserData(data.user);
				localStorage.setItem("token", data.token);
				navigate("/home");
			}

			setEmail("");
			setName({ firstName: "", lastName: "" });
			setPassword("");
			setUsername("");
			setConfirmPassword("");
			setContactNumber("");
		} catch (error) {
			console.error("Signup failed", error);
		}
	};

	return (
		<div className="p-5 flex flex-col justify-between h-screen">
			<div>
				<img
					className="cover w-20 mb-5"
					src="https://imgs.search.brave.com/exYdUgItfG2uOaesGrC7YcSDcWafZAAWXEQW6Q9SzLs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA5/L1JhcGlkby1Mb2dv/LTUwMHgyODEucG5n"
					alt="Logo"
				/>

				<div className="flex justify-center space-x-2 mb-4">
					<div
						className={`w-3 h-3 rounded-full ${
							step === 1 ? "bg-black" : "bg-gray-300"
						}`}
					/>
					<div
						className={`w-3 h-3 rounded-full ${
							step === 2 ? "bg-black" : "bg-gray-300"
						}`}
					/>
				</div>

				<form onSubmit={submitHandler}>
					{step === 1 && (
						<div className="transition-opacity duration-300 ease-in-out">
							<h3 className="text-lg font-medium mb-2">What's your Name</h3>
							<div className="flex justify-around">
								<input
									className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-[45%] mb-5"
									required
									value={name.firstName}
									onChange={(e) =>
										setName({ ...name, firstName: e.target.value })
									}
									placeholder="First Name"
									type="text"
								/>
								<input
									className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-[45%] mb-5"
									required
									value={name.lastName}
									onChange={(e) =>
										setName({ ...name, lastName: e.target.value })
									}
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
									style={{
										border: !isUsernameValid
											? "1px solid red"
											: "1px solid #cccccc",
									}}
								/>
								<div style={{ height: "1.25rem", marginTop: "0.25rem" }}>
									{username && !isUsernameValid && (
										<p className="text-red-600 text-sm">
											Username format is invalid.
										</p>
									)}
									{username &&
										isUsernameValid &&
										usernameAvailable !== null && (
											<p
												className={`text-sm ${
													usernameAvailable ? "text-green-600" : "text-red-600"
												}`}
											>
												{usernameAvailable
													? "Username is available"
													: "Username is taken"}
											</p>
										)}
								</div>
								<h3 className="text-lg font-medium mb-2">What's your email</h3>
								<input
									className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-full mb-1"
									required
									value={email}
									onChange={(e) => {
										const val = e.target.value;
										setEmail(val);
										setIsEmailValid(emailRegex.test(val));
									}}
									placeholder="email@example.com"
									type="email"
								/>
								<div style={{ height: "1.5rem" }}>
								{!isEmailValid && (
									<p className="text-red-600 text-sm ">
										Enter a valid email address
									</p>
								)}
								</div>
							</div>

							<button
								type="button"
								onClick={() => setStep(2)}
								className="mb-2 rounded py-3 w-full text-2xl bg-black text-white font-semibold"
							>
								Next
							</button>
						</div>
					)}

					{step === 2 && (
						<div className="transition-opacity duration-300 ease-in-out">
							<h3 className="text-lg font-medium mb-2 mt-4">Contact Number</h3>
							<input
								className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-full mb-5"
								value={contactNumber}
								onChange={(e) => setContactNumber(e.target.value)}
								placeholder="Contact Number(Optional)"
								type="tel"
							/>

							<h3 className="text-lg font-medium mb-2">Enter Password</h3>
							<input
								className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-full mb-1"
								required
								value={password}
								onChange={(e) => {
									const val = e.target.value;
									setPassword(val);
									setIsPasswordValid(passwordRegex.test(val));
								}}
								placeholder="Password"
								type="password"
							/>
							<div style={{ height: "1.5rem" }}>
							{!isPasswordValid && (
								
									<p className="text-red-600 text-sm mt-1">
										Password must be at least 8 characters long and contain
										uppercase, lowercase, and a number
									</p>
							
							)}
							</div>

							<h3 className="text-lg font-medium mb-2 mt-4">
								Confirm Password
							</h3>
							<input
								className="py-2 rounded px-4 bg-[#eeeeee] text-lg placeholder:text-base w-full mb-1"
								required
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Confirm Password"
								type="password"
							/>
							<div style={{ height: "1.25rem" }}>
							{!doPasswordsMatch && (
								<p className="text-red-600 text-sm ">
									Passwords do not match
								</p>
							)}
							</div>

							<div className="flex justify-between space-x-4 mt-5">
								<button
									type="button"
									onClick={() => setStep(1)}
									className="rounded py-3 w-1/2 text-xl border border-black"
								>
									Back
								</button>
								<button
									type="submit"
									className="rounded py-3 w-1/2 text-xl bg-black text-white"
								>
									Signup
								</button>
							</div>
						</div>
					)}

					<p className="mt-3 text-sm">
						Already have an account?{" "}
						<Link className="text-blue-600" to="/login">
							Login Here
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default UserSignup;
