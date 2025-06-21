import FiltersSection from "../components/filter/filters-section";
import IssuesList from "../components/issues-list/issues-list";
import Navbar from "../components/navbar/navbar";

const Home = () => {
	return (
		<div>
			<Navbar />
			<div className="flex h-full w-full">
				<FiltersSection />
				<IssuesList />
			</div>
		</div>
	);
};

export default Home;
