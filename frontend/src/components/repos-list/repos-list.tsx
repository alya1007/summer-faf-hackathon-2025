import Tag from "../ui/tag";

export type Repo = {
	name: string;
	url: string;
	stars: number;
	forks: number;
	langs: string[];
	domains: string[];
	good_first: boolean;
};

type ReposListProps = {
	repos: Repo[];
};

const ReposList = ({ repos }: ReposListProps) => {
	return (
		<div
			className="flex flex-col gap-4 bg-card p-8 rounded-lg shadow-md overflow-y-auto
			max-h-[calc(100vh-160px)] text-white scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
			hover:scrollbar-thumb-gray-500 transition-all duration-300 w-full
		"
		>
			<h2 className="text-lg font-semibold">Repositories List</h2>

			{repos.map((repo: Repo) => (
				<div
					key={repo.name}
					className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col gap-2"
				>
					<a
						href={repo.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-400 font-medium text-lg hover:underline"
					>
						{repo.name}
					</a>

					<div className="text-sm text-gray-400">
						⭐ {repo.stars} &nbsp; | &nbsp; 🍴 {repo.forks}
						{repo.good_first && (
							<span className="ml-3 inline-block text-green-400 font-semibold">
								Good First Issue
							</span>
						)}
					</div>

					<div className="flex flex-wrap gap-2 mt-2">
						{repo.langs.map((lang) => (
							<Tag key={lang} label={lang} />
						))}
						{repo.domains.map((domain) => (
							<Tag key={domain} label={domain} />
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default ReposList;
