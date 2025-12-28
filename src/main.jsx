import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

export function RootApp() {
	useEffect(() => {
		const disableRightClick = (e) => e.preventDefault();

		const disableKeyShortcuts = (e) => {
			if ((e.ctrlKey || e.metaKey) && ["s", "p", "u", "c"].includes(e.key.toLowerCase())) {
				e.preventDefault();
			}
		};

		document.addEventListener("contextmenu", disableRightClick);
		document.addEventListener("keydown", disableKeyShortcuts);

		return () => {
			document.removeEventListener("contextmenu", disableRightClick);
			document.removeEventListener("keydown", disableKeyShortcuts);
		};
	}, []);

	return <App />;
}

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RootApp />
	</StrictMode>
);
