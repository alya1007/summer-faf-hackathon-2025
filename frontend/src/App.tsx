import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Profile from "./pages/profile";
import AuthCallback from "./pages/auth-callback";
import Navbar from "./components/navbar/navbar";
import { AuthProvider } from "./context/auth-context";

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<div className="flex flex-col min-h-screen">
						<Navbar />
						<div className="flex flex-1 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
							<Routes>
								<Route index element={<Home />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/auth/callback" element={<AuthCallback />} />
							</Routes>
						</div>
					</div>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
