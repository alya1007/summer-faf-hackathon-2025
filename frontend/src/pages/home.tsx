import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersSection from "../components/filter/filters-section";
import ReposList, { type Repo } from "../components/repos-list/repos-list";

export type ReposResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Repo[];
};

const Home = () => {
	const [repos, setRepos] = useState<Repo[]>([]);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const params = new URLSearchParams();

				if (searchParams.get("language"))
					params.set("lang", searchParams.get("language")!);
				if (searchParams.get("domain"))
					params.set("domain", searchParams.get("domain")!);
				if (searchParams.get("good_first"))
					params.set("good_first", searchParams.get("good_first")!);

				const url = `${import.meta.env.VITE_API_URL
					}/repos/search/?${params.toString()}`;
				const response = await fetch(url);
				if (!response.ok) throw new Error("Network response was not ok");

				const data = (await response.json()) as ReposResponse;
				setRepos(data.results);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};

		fetchData();
	}, [searchParams]);

	return (
		<div className="flex flex-1 m-10 gap-10">
			<FiltersSection />
			<ReposList repos={repos} />
		</div>
	);
};

export default Home;
