import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { UserProvider } from "./context/UserProvider";
import { ConvoProvider } from "./context/ConvoProvider";
import App from "./App";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<ConvoProvider>
				<App />
			</ConvoProvider>
		</UserProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
