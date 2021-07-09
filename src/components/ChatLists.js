import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import db from "../firebase";
import { User } from "../context/UserProvider";
import { ChatUID } from "../context/ConvoProvider";

function ChatLists() {
	const user = User();
	const selectedChat = ChatUID();
	const [chats, setChats] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection("users")
			.doc(user.id)
			.collection("contacts")
			.onSnapshot((snapshot) => {
				setChats(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});

		return () => {
			unsubscribe();
		};

		// setChats((prevChats) => {
		// 	return [...prevChats, { id: 23424, data: { name: "room1" } }];
		// });
	}, [user.id]);

	return (
		<div className="flex flex-auto flex-col overflow-y-auto p-2 space-y-2">
			{chats.map((chat) => (
				<Chat
					name={chat.data.recipientName}
					photo={chat.data.recipientPhoto}
					id={chat.data.recipientUID}
					key={chat.id}
					lastMessage={chat.data.lastMessage}
					time={chat.data.timestamp}
					chatUID={chat.data.chatUID}
					selected={chat.data.chatUID === selectedChat}
				/>
			))}
		</div>
	);
}

export default ChatLists;
