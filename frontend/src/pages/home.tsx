import { useEffect } from "react";
import FiltersSection from "../components/filter/filters-section";
import ReposList from "../components/repos-list/repos-list";

const Home = () => {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/repos/search/`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="flex flex-1 m-10 gap-10">
			<FiltersSection />
			<ReposList data={mockData} />
		</div>
	);
};

export default Home;
