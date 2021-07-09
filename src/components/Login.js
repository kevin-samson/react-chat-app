import React from "react";
import db, { auth, provider } from "../firebase";
import { useUser } from "../context/UserProvider";

function Login() {
	const [user, setUser] = useUser();

	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((res) => {
				db.doc(`users/${res.user.uid}`)
					.get()
					.then((res2) => {
						if (!res2.exists) {
							db.collection("users").doc(res.user.uid).set({
								name: res.user.displayName,
								email: res.user.email,
								photo: res.user.photoURL,
								id: res.user.uid,
							});
						}
					});
				setUser({
					name: res.user.displayName,
					id: res.user.uid,
					photo: res.user.photoURL,
				});
			})
			.catch((err) => alert(err.message));
	};
	return (
		<div className="flex absolute inset-0 justify-center items-center">
			<button
				className="bg-blue-500 p-5 rounded-xl focus:outline-none text-blue-900"
				onClick={signIn}
			>
				Sign in with Google
			</button>
		</div>
	);
}

export default Login;
