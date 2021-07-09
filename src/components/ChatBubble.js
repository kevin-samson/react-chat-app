import React from "react";

function ChatBubble({ message, FromMe, resPic, senPic, time }) {
	let default_name = "flex flex-row space-x-3";
	if (FromMe) {
		default_name = "space-x-3 space-x-reverse flex flex-row-reverse ";
	}
	const date = new Date(time?.toDate());
	const Newtime = date.toLocaleTimeString("en-US", {
		hour12: true,
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<div className={default_name}>
			{FromMe ? (
				<img src={senPic} alt="sender" className="rounded-full h-9" />
			) : (
				<img src={resPic} alt="reciver" className="rounded-full h-9" />
			)}
			<div className="flex flex-col">
				<div
					className={`h-auto rounded-2xl p-4  ${
						FromMe
							? "bg-other-sbubble text-white"
							: "bg-other-rbubble text-gray-300"
					}`}
				>
					{message}
				</div>
				<div
					className={`${default_name} text-xs text-other-muted tracking-tighter p-px`}
				>
					{Newtime}
				</div>
			</div>
		</div>
	);
}

export default ChatBubble;
