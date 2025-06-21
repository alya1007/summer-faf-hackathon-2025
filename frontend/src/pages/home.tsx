import { useEffect, useState } from "react";
import FiltersSection from "../components/filter/filters-section";
import ReposList, { type Repo } from "../components/repos-list/repos-list";

export type ReposResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Repo[];
};

const Home = () => {
	const [repos, setRepos] = useState<Repo[]>([
		{
			name: "",
			url: "",
			stars: 0,
			forks: 0,
			langs: [],
			domains: [],
			good_first: false,
		},
	]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/repos/search/`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = (await response.json()) as ReposResponse;
				setRepos(data.results);
				console.log(repos);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex flex-1 m-10 gap-10 overflow-hidden">
			<FiltersSection />
			<div className="flex-1 overflow-hidden">
				<ReposList repos={repos} />
			</div>
		</div>
	);
};

export default Home;
