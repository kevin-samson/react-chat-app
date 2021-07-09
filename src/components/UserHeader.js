import React from "react";

import CreateConvo from "./CreateConvo";

import { auth } from "../firebase";
import { useUser } from "../context/UserProvider";
import { SetConvo, SetChatUID } from "../context/ConvoProvider";

function UserHeader() {
	const [user, setUser] = useUser();
	const convo = SetConvo();
	const chatUID = SetChatUID();

	function logOut() {
		auth.signOut()
			.then(() => {
				setUser();
				convo();
				chatUID();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<div className="flex flex-row flex-none justify-between items-center p-4 h-16 bg-chat-header">
				<img
					className="rounded-full h-10 w-10"
					src={user.photo}
					alt="userphoto"
				/>
				<div className="flex flex-row space-x-2">
					<svg
						cursor="pointer"
						onClick={logOut}
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 stroke-current text-other-muted"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.7}
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
				</div>
			</div>
			<div className="flex flex-row flex-none justify-center items-center h-14 border-b border-t border-other-darkb">
				<CreateConvo />
			</div>
		</>
	);
}

export default UserHeader;
