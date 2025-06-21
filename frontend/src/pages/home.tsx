import FiltersSection from "../components/filter/filters-section";
import IssuesList from "../components/issues-list/issues-list";

const Home = () => {
	return (
		<div className="flex flex-1 m-10 gap-10">
			<FiltersSection />
			<IssuesList />
		</div>
	);
};

export default Home;
