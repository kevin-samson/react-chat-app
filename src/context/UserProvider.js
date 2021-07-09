import React, { useState, createContext, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userDetails, setUserDetails] = useState();

	return (
		<UserContext.Provider value={[userDetails, setUserDetails]}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	return useContext(UserContext);
};

export const User = () => {
	return useContext(UserContext)[0];
};
