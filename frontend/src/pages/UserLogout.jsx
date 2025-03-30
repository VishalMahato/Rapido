import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserLogout = () => {
	const navigate = useNavigate();

    axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`, {}, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
      

	return <div>UserLogout</div>;
};

export default UserLogout;
