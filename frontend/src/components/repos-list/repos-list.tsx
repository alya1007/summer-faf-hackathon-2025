import React from "react";
import Tag from "../ui/tag";

interface Repo {
  name: string;
  url: string;
  stars: number;
  forks: number;
  langs: string[];
  domains: string[];
  good_first: boolean;
}

interface ReposListProps {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Repo[];
  };
}

const ReposList: React.FC<ReposListProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 bg-card p-8 rounded-lg shadow-md flex-1">
      <h2 className="text-lg font-semibold">Repositories List</h2>

      {data.results.map((repo) => (
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
