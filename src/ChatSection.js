import React from "react";
import ChatBody from "./components/ChatBody";
import { Recipient } from "./context/ConvoProvider";
import SendMessage from "./components/SendMessage";

function ChatSection() {
	const recipient = Recipient();

	document.title = recipient.name;

	return (
		<div className=" w-3/4 flex flex-col">
			<div className="flex flex-row flex-none justify-between items-center h-16 px-4 bg-chat-body border-b border-other-darkb">
				<div className="flex flex-row space-x-4 items-center">
					<img
						className="rounded-full h-10 w-10"
						src={recipient.photo}
						alt="recipient"
					/>
					<h1 className="text-white text-lg">{recipient.name}</h1>
				</div>
				<div className="flex flex-row space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 stroke-current text-other-muted"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clipRule="evenodd"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 stroke-current text-other-muted"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
					</svg>
				</div>
			</div>
			<div className="flex flex-col flex-auto  p-6 px-9 overflow-y-auto space-y-3 bg-chat-body">
				<ChatBody />
			</div>
			<SendMessage />
		</div>
	);
}

export default ChatSection;
