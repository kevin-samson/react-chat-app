import React, { createContext, useState, useContext } from "react";

export const ConvoContext = createContext();

export const ConvoProvider = ({ children }) => {
	const [recipientDetais, setRecipientDetails] = useState();
	const [chatUID, setChatUID] = useState();

	return (
		<ConvoContext.Provider
			value={{
				recipient: [recipientDetais, setRecipientDetails],
				chat: [chatUID, setChatUID],
			}}
		>
			{children}
		</ConvoContext.Provider>
	);
};

export const SetConvo = () => {
	return useContext(ConvoContext).recipient[1];
};

export const Recipient = () => {
	return useContext(ConvoContext).recipient[0];
};

export const SetChatUID = () => {
	return useContext(ConvoContext).chat[1];
};

export const ChatUID = () => {
	return useContext(ConvoContext).chat[0];
};
