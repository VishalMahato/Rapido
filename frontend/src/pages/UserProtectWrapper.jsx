import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
	// const token = cookie.get("token")

	const navigate = useNavigate();
	const { userData, setUserData } = useContext(UserDataContext);
	const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
          .get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/profile`, {
            withCredentials: true,
          })
          .then((response) => {
            if (response.status === 200) {
              console.log(response, "/n user profile response data");
              setUserData(response.data);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            cookie.remove("token");
            navigate("/login");
          });
      }, []); 
      

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
};

export default UserProtectWrapper;
