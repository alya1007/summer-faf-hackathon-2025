import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AxiosInterceptorWrapper } from "./utils/axios";
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
					<AxiosInterceptorWrapper>
						<Navbar />
						<Routes>
							<Route index element={<Home />} />
							<Route path="/register" element="<div>lksjdslkd</div>" />
							<Route path="/login" element="<div>login</div>" />
							<Route path="/profile" element={<Profile />} />
							<Route path="/auth/callback" element={<AuthCallback />} />
						</Routes>
					</AxiosInterceptorWrapper>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
