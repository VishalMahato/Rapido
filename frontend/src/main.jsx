import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";

const root = document.getElementById("root");
createRoot(root).render(
	<UserContext>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</UserContext>
);
