import React, { useState, useRef } from "react";
import { User } from "../context/UserProvider";
import { Recipient } from "../context/ConvoProvider";
import { ChatUID } from "../context/ConvoProvider";
import db from "../firebase";
import Picker from "emoji-picker-react";
import firebase from "firebase";
import { Popover } from "@headlessui/react";

function SendMessage() {
	const inputRef = useRef();
	const recipient = Recipient();
	const user = User();
	const chatUID = ChatUID();

	const [message, setMessage] = useState("");

	const onEmojiClick = (event, emojiObject) => {
		setMessage((prev) => prev + emojiObject.emoji);
		inputRef.current.focus();
	};

	function handlesubmit(e) {
		e.preventDefault();
		if (!message) return;
		let newMsg = db
			.collection("chats")
			.doc(chatUID)
			.collection("messages")
			.doc();

		newMsg.set({
			message: message,
			messageUID: newMsg.id,
			recipientName: recipient.name,
			recipientUID: recipient.id,
			senderName: user.name,
			senderUID: user.id,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		db.collection("users")
			.doc(user.id)
			.collection("contacts")
			.doc(chatUID)
			.set(
				{
					lastMessage: message,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				},
				{ merge: true }
			);
		db.collection("users")
			.doc(recipient.id)
			.collection("contacts")
			.doc(chatUID)
			.set(
				{
					lastMessage: message,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				},
				{ merge: true }
			);

		setMessage("");
	}
	return (
		<form onSubmit={handlesubmit} autocomplete="off">
			<div className="flex flex-row justify-between items-center flex-none h-16 px-4 bg-chat-body border-t border-other-darkb">
				<div className="flex flex-row space-x-3 items-center">
					<Popover className="relative">
						{(open) => (
							<>
								<Popover.Button className="focus:outline-none ">
									<svg
										cursor="pointer"
										xmlns="http://www.w3.org/2000/svg"
										className={`h-6 w-6 stroke-current  ${
											open.open
												? "text-gray-600"
												: "text-other-muted"
										}`}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.7}
											d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</Popover.Button>

								<Popover.Panel className="absolute bottom-12">
									<Picker onEmojiClick={onEmojiClick} />
								</Popover.Panel>
							</>
						)}
					</Popover>
				</div>
				<input
					ref={inputRef}
					onChange={(e) => setMessage(e.target.value)}
					value={message}
					type="text"
					className="flex-auto rounded-xl mx-4 h-10 bg-gray-400 outline-none px-4"
					contentEditable="true"
					placeholder="Type your message here..."
					tabIndex="0"
					dir="ltr"
					spellCheck="false"
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
				/>

				<button type="submit" className="hidden" />
			</div>
		</form>
	);
}

export default SendMessage;
