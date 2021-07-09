import React from "react";
import UserHeader from "./components/UserHeader";
import ChatLists from "./components/ChatLists";
import { User } from "./context/UserProvider";

function Sidebar() {
	const user = User();
	return (
		<div className="flex flex-auto flex-col w-1/3 h-screen bg-chat-list border-r border-other-darkb">
			<UserHeader />
			<ChatLists />
			<div className="flex-none flex h-16 text-gray-400 items-center justify-center border-t border-other-darkb">
				Your id is :- {user.id}
			</div>
		</div>
	);
}

export default Sidebar;
