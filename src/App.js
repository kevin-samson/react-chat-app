import React from "react";
import Sidebar from "./Sidebar";
import ChatSection from "./ChatSection";
import Login from "./components/Login";
import { User } from "./context/UserProvider";
import { Recipient } from "./context/ConvoProvider";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	const user = User();
	const recipient = Recipient();
	return (
		<div className="flex flex-none flex-row h-screen ">
			{!user ? (
				<Login />
			) : (
				<>
					<Sidebar />
					{!recipient ? (
						<div className="w-3/4 flex flex-col bg-chat-body justify-center items-center space-y-4">
							<img
								className="rounded-full"
								src={user.photo}
								alt="user"
							/>
							<h1 className="text-white text-2xl">
								Welcome, {user.name}!
							</h1>
							<h1 className="text-other-muted text-sm">
								Select a chat or create a new chat
							</h1>
						</div>
					) : (
						<ChatSection />
					)}
				</>
			)}
		</div>
	);
}

export default App;
