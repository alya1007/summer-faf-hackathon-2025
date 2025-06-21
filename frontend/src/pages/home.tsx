import FiltersSection from "../components/filter/filters-section";
import ReposList from "../components/repos-list/repos-list";

const Home = () => {
	return (
		<div className="flex flex-1 m-10 gap-10">
			<FiltersSection />
			<ReposList />
		</div>
	);
};

export default Home;
