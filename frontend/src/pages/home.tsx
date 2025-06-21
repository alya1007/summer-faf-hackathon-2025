import FiltersSection from "../components/filter/filters-section";
import ReposList from "../components/repos-list/repos-list";
const mockData = {
	count: 3,
	next: null,
	previous: null,
	results: [
	  {
		name: "TestRepo1",
		url: "http://github.com/test-user/test-repo-1",
		stars: 5,
		forks: 2,
		langs: ["python"],
		domains: ["backend"],
		good_first: false,
	  },
	  {
		name: "TestRepo0",
		url: "http://github.com/test-user/test-repo-0",
		stars: 1,
		forks: 1,
		langs: ["c#"],
		domains: ["game_dev"],
		good_first: true,
	  },
	  {
		name: "TestRepo2",
		url: "http://github.com/test-user/test-repo-2",
		stars: 1,
		forks: 2,
		langs: ["js"],
		domains: ["frontend"],
		good_first: true,
	  },
	],
  };
const Home = () => {
	return (
		<div className="flex flex-1 m-10 gap-10">
			<FiltersSection />
			<ReposList data={mockData}/>
		</div>
	);
};

export default Home;
