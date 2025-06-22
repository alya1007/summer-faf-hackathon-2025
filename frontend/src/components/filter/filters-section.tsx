import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Button } from "../ui/button";
import { useAuth } from "../../context/auth-context";

const beginnerFriendlyOptions = [
	{ value: "", label: "All" },
	{ value: "true", label: "Beginner friendly" },
	{ value: "false", label: "Not beginner friendly" },
];

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

type FilterList = {
	pref_langs: string[];
	pref_domains: string[];
};

const FiltersSection = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { user } = useAuth();

	const [languageOptions, setLanguageOptions] = useState<
		{ value: string; label: string }[]
	>([{ value: "", label: "All" }]);

	const [tagOptions, setTagOptions] = useState<
		{ value: string; label: string }[]
	>([{ value: "", label: "All" }]);

	const [language, setLanguage] = useState(languageOptions[0]);
	const [tag, setTag] = useState(tagOptions[0]);
	const [beginnerFriendly, setBeginnerFriendly] = useState(
		beginnerFriendlyOptions[0]
	);

	useEffect(() => {
		const fetchLanguagesAndDomains = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/repos/filters-list/`
				);
				if (!response.ok)
					throw new Error("Failed to fetch languages and domains");
				const data = (await response.json()) as FilterList;

				const langs = data.pref_langs.map((lang) => ({
					value: lang.toLowerCase(),
					label: lang.charAt(0).toUpperCase() + lang.slice(1),
				}));

				const domains = data.pref_domains.map((domain) => ({
					value: domain.toLowerCase(),
					label: domain.charAt(0).toUpperCase() + domain.slice(1),
				}));

				const myLangsOption =
					user && data.pref_langs.length > 0
						? [{ value: "__my_langs__", label: "My Languages" }]
						: [];
				const myDomainsOption =
					user && data.pref_domains.length > 0
						? [{ value: "__my_domains__", label: "My Domains" }]
						: [];

				setLanguageOptions([
					{ value: "", label: "All" },
					...myLangsOption,
					...langs,
				]);
				setTagOptions([
					{ value: "", label: "All" },
					...myDomainsOption,
					...domains,
				]);
			} catch (error) {
				console.error("Error fetching languages and domains:", error);
			}
		};

		fetchLanguagesAndDomains();
	}, [user]);

	useEffect(() => {
		const selectedLanguages = searchParams.getAll("language");
		const selectedDomains = searchParams.getAll("domain");

		if (
			user &&
			selectedLanguages.length > 0 &&
			user.pref_langs &&
			selectedLanguages.every((lang) =>
				user.pref_langs.includes(lang.toLowerCase())
			)
		) {
			setLanguage(
				languageOptions.find((opt) => opt.value === "__my_langs__") ||
					languageOptions[0]
			);
		} else {
			const match = languageOptions.find(
				(opt) => opt.value === selectedLanguages[0]
			);
			setLanguage(match || languageOptions[0]);
		}

		if (
			user &&
			selectedDomains.length > 0 &&
			user.pref_domains &&
			selectedDomains.every((domain) =>
				user.pref_domains.includes(domain.toLowerCase())
			)
		) {
			setTag(
				tagOptions.find((opt) => opt.value === "__my_domains__") ||
					tagOptions[0]
			);
		} else {
			const match = tagOptions.find((opt) => opt.value === selectedDomains[0]);
			setTag(match || tagOptions[0]);
		}

		setBeginnerFriendly(
			beginnerFriendlyOptions.find(
				(opt) => opt.value === searchParams.get("good_first")
			) || beginnerFriendlyOptions[0]
		);
	}, [searchParams, languageOptions, tagOptions, user]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();

		if (language.value === "__my_langs__" && user) {
			user.pref_langs?.forEach((lang: string) =>
				params.append("language", lang.toLowerCase())
			);
		} else if (language.value) {
			params.append("language", language.value);
		}

		if (tag.value === "__my_domains__" && user) {
			user.pref_domains?.forEach((domain: string) =>
				params.append("domain", domain.toLowerCase())
			);
		} else if (tag.value) {
			params.append("domain", tag.value);
		}

		if (beginnerFriendly.value) {
			params.set("good_first", beginnerFriendly.value);
		}

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
