/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { SetConvo, SetChatUID } from "../context/ConvoProvider";
import ReactTimeAgo from "react-time-ago";

function Chat({ name, photo, id, chatUID, lastMessage, time, selected }) {
	const setRecipient = SetConvo();
	const setChatUID = SetChatUID();

	function handleclick(e) {
		e.preventDefault();
		setRecipient({ name, photo, id });
		setChatUID(chatUID);
	}

	return (
		<>
			{/* <div className="block border border-other-chatB">
				<div
					onClick={handleclick}
					className="flex border border-other-chatB rounded-md hover:border-other-sbubble transition duration-150 ease-in-out"
				>
					<div className="flex flex-row p-3 space-x-4 items-center w-2/3">
						<img
							className="rounded-full h-12 w-12"
							src={photo}
							alt="user"
						/>
						<div className="flex flex-col text-white font-mono font-thin">
							<div className="flex flex-grow justify-between items-center">
								<div>{name}</div>
								<div>helo</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text-xs pt-1  text-other-muted truncate w-2/3">
					{lastMessage}
				</div>
			</div> */}
			{/* <a className="block" onClick={handleclick}>
				<div className="flex flex-col border border-other-chatB rounded-md hover:border-other-sbubble transition duration-150 ease-in-out p-3">
					<div className="flex flex-row items-center space-x-2">
						<img
							className="rounded-full h-12 w-12"
							src={photo}
							alt="user"
						/>
						<strong className="flex-grow  text-gray-300 font-light">
							{name}
						</strong>
						{time ? (
							<ReactTimeAgo
								className="text-other-muted text-xs pl-2"
								date={new Date(time.toDate())}
								timeStyle="twitter"
							/>
						) : null}
					</div>
					<div className="flex-grow truncate text-xs text-other-muted">
						{lastMessage}
					</div>
				</div>
			</a> */}
			<div
				className={`flex flex-row items-center border border-other-chatB rounded-md hover:border-other-sbubble transition duration-150 ease-in-out p-5 space-x-2 cursor-pointer ${
					selected ? "bg-other-sbubble" : ""
				}`}
				onClick={handleclick}
			>
				<img className="rounded-full h-12 w-12" src={photo} alt="" />
				<div className="block truncate space-y-2 w-full">
					<div className="flex flex-row items-center justify-between space-x-2">
						<strong className="text-gray-300 font-medium">
							{name}
						</strong>
						{time ? (
							<ReactTimeAgo
								className="text-other-muted pl-2"
								date={new Date(time.toDate())}
								timeStyle="twitter"
							/>
						) : null}
					</div>
					<div className="flex-auto truncate text-sm text-other-muted">
						{lastMessage}
					</div>
				</div>
			</div>
		</>
	);
}

export default Chat;
