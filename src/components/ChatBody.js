import React, { useEffect, useState, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { ChatUID } from "../context/ConvoProvider";
import { User } from "../context/UserProvider";
import { Recipient } from "../context/ConvoProvider";
import db from "../firebase";

function ChatBody() {
	const scrool = useRef();
	const chatUID = ChatUID();
	const user = User();
	const recipient = Recipient();
	const [chats, setChats] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(chatUID)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.limit(50)
			.onSnapshot((snapshot) => {
				setChats(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});
		return () => unsubscribe();
	}, [chatUID]);

	useEffect(() => {
		if (scrool.current) {
			scrool.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		}
	}, [chats]);

	return (
		<>
			{chats
				.slice(0)
				.reverse()
				.map((chat) => (
					<ChatBubble
						message={chat.data.message}
						FromMe={chat.data.recipientUID !== user.id}
						resPic={recipient.photo}
						senPic={user.photo}
						time={chat.data.timestamp}
						key={chat.id}
					/>
				))}
			<div ref={scrool}></div>
		</>
	);
}

export default ChatBody;
