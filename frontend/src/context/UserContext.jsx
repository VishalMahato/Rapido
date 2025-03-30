import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    
	const [userData, setUserData] = useState({
		email: "",
		name: {
			firstName:"",
			lastName:"",
		},
		username:"",
	})

	return (
		<UserDataContext.Provider value={{userData, setUserData}}>
			<div>{children}</div>
		</UserDataContext.Provider>
	);
};

export default UserContext;
