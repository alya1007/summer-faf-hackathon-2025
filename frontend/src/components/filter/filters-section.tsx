import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Button } from "../ui/button";

const languageOptions = [
	{ value: "", label: "All" },
	{ value: "", label: "My Languages" },
	{ value: "js", label: "JS" },
	{ value: "c#", label: "C#" },
	{ value: "python", label: "Python" },
	{ value: "java", label: "Java" },
	{ value: "go", label: "Go" },
];

const tagOptions = [
	{ value: "", label: "All" },
	{ value: "", label: "My Domains" },
	{ value: "frontend", label: "Frontend" },
	{ value: "backend", label: "Backend" },
	{ value: "game", label: "Game Development" },
	{ value: "mobile", label: "Mobile Development" },
	{ value: "docs", label: "Documentation" },
];

const beginnerFriendlyOptions = [
	{ value: "", label: "All" },
	{ value: "true", label: "Beginner friendly" },
	{ value: "false", label: "Not beginner friendly" },
];

// Dark theme styles for react-select
const darkSelectStyles = {
	control: (base: any) => ({
		...base,
		backgroundColor: "#1f2937", // Tailwind gray-800
		borderColor: "#374151", // Tailwind gray-700
		color: "#f9fafb", // Tailwind gray-50
	}),
	menu: (base: any) => ({
		...base,
		backgroundColor: "#1f2937",
	}),
	option: (base: any, state: any) => ({
		...base,
		backgroundColor: state.isFocused ? "#374151" : "#1f2937",
		color: "#f9fafb",
		cursor: "pointer",
	}),
	singleValue: (base: any) => ({
		...base,
		color: "#f9fafb",
	}),
	input: (base: any) => ({
		...base,
		color: "#f9fafb",
	}),
	placeholder: (base: any) => ({
		...base,
		color: "#9ca3af",
	}),
};

const FiltersSection = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [language, setLanguage] = useState(languageOptions[0]);
	const [tag, setTag] = useState(tagOptions[0]);
	const [beginnerFriendly, setBeginnerFriendly] = useState(
		beginnerFriendlyOptions[0]
	);

	useEffect(() => {
		setLanguage(
			languageOptions.find(
				(opt) => opt.value === searchParams.get("language")
			) || languageOptions[0]
		);
		setTag(
			tagOptions.find((opt) => opt.value === searchParams.get("domain")) ||
				tagOptions[0]
		);
		setBeginnerFriendly(
			beginnerFriendlyOptions.find(
				(opt) => opt.value === searchParams.get("good_first")
			) || beginnerFriendlyOptions[0]
		);
	}, [searchParams]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const params: Record<string, string> = {};
		if (language.value) params.language = language.value;
		if (tag.value) params.domain = tag.value;
		if (beginnerFriendly.value) params.good_first = beginnerFriendly.value;
		setSearchParams(params);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 bg-card p-8 rounded-lg shadow-md min-w-80 text-white"
		>
			<h2 className="text-lg font-semibold">Filters</h2>

			<div className="flex flex-col gap-2">
				<label className="text-sm font-medium">Language</label>
				<Select
					options={languageOptions}
					value={language}
					onChange={(option) => setLanguage(option!)}
					styles={darkSelectStyles}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-sm font-medium">Tag</label>
				<Select
					options={tagOptions}
					value={tag}
					onChange={(option) => setTag(option!)}
					styles={darkSelectStyles}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-sm font-medium">Difficulty Level</label>
				<Select
					options={beginnerFriendlyOptions}
					value={beginnerFriendly}
					onChange={(option) => setBeginnerFriendly(option!)}
					styles={darkSelectStyles}
				/>
			</div>

			<Button type="submit" className="mt-4">
				Apply Filters
			</Button>
		</form>
	);
};
export default FiltersSection;
