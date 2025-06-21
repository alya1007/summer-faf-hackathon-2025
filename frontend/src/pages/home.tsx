import FiltersSection from "../components/filter/filters-section";
import IssuesList from "../components/issues-list/issues-list";

const Home = () => {
	return (
		<div>
			<div className="flex h-full w-full">
				<FiltersSection />
				<IssuesList />
			</div>
		</div>
	);
};

export default Home;
