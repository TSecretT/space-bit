import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components";

import { Home, Marketplace, MySet, Reacteroids } from './pages';

const App = () => {

	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={ <Home /> } />
				<Route path="/marketplace" element={ <Marketplace /> } />
				<Route path="/set" element={ <MySet /> } />
				<Route path="/game" element={ <Reacteroids /> } />
			</Routes>
		</Router>
	)
}

export default App;
