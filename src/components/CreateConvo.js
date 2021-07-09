import React, { useState, useRef } from "react";
import { User } from "../context/UserProvider";
import db from "../firebase";
import firebase from "firebase";
import { Dialog, Transition } from "@headlessui/react";

export default function CreateConvo() {
	const senderData = User();

	const [enteredId, setEnteredId] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const inputBox = useRef(null);

	function Create() {
		let docRef = db.collection("users").doc(enteredId);

		docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					let recipientData = doc.data();

					const chatId = db.collection("chats").doc();
					chatId.set({ chatUID: chatId.id });
					let newMessage = chatId.collection("messages").doc();
					// Creating a new chat
					newMessage.set({
						message: "helo lets chat",
						messageUID: newMessage.id,
						senderName: senderData.name,
						recipientName: recipientData.name,
						senderUID: senderData.id,
						recipientUID: recipientData.id,
						timestamp:
							firebase.firestore.FieldValue.serverTimestamp(),
					});
					// Setting a contact to Sender
					db.collection("users")
						.doc(senderData.id)
						.collection("contacts")
						.doc(chatId.id)
						.set({
							chatUID: chatId.id,
							recipientName: recipientData.name,
							recipientPhoto: recipientData.photo,
							recipientUID: recipientData.id,
						});
					// Setting a contact to recipient
					db.collection("users")
						.doc(recipientData.id)
						.collection("contacts")
						.doc(chatId.id)
						.set({
							chatUID: chatId.id,
							recipientName: senderData.name,
							recipientPhoto: senderData.photo,
							recipientUID: senderData.id,
						});
					setIsOpen(false);
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
					setIsOpen(false);
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
				setIsOpen(false);
			});
	}

	return (
		<>
			<button
				className="focus:outline-none bg-gray-600 rounded-xl p-2 text-gray-300"
				onClick={() => setIsOpen(true)}
			>
				Start new Chat
			</button>
			<Transition
				show={isOpen}
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Dialog
					onClose={() => setIsOpen(false)}
					initialFocus={inputBox}
					className="flex z-10 inset-0 absolute justify-center items-center bg-black bg-opacity-70"
				>
					<Dialog.Overlay className="bg-black bg-opacity-70" />
					<div className=" bg-white rounded-xl w-auto h-40 p-4 flex flex-col shadow-2xl">
						<div className="flex flex-col items-end">
							<button>
								<svg
									onClick={() => setIsOpen(false)}
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>
						<div className="flex flex-col w-1/2 space-y-2">
							<Dialog.Title className="text-2xl font-bold">
								Add a Friend
							</Dialog.Title>
							<div className="flex space-x-4">
								<input
									ref={inputBox}
									className="focus:outline-none bg-gray-300 rounded-xl p-4 text-xl"
									onChange={(e) => {
										setEnteredId(e.target.value);
									}}
									type="text"
									placeholder="Enter ID"
								/>
								<button
									onClick={Create}
									className="bg-blue-600 rounded-xl p-4 text-blue-200"
								>
									Search
								</button>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
