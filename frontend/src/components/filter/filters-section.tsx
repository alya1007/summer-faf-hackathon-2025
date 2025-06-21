import React, { useState } from "react";
import Select from "react-select";

const languageOptions = [
  { value: "", label: "My Languages" },
  { value: "js", label: "JS" },
  { value: "c#", label: "C#" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
];

const tagOptions = [
  { value: "", label: "My Domains" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "game", label: "Game Development" },
  { value: "mobile", label: "Mobile Development" },
  { value: "docs", label: "Documentation" },
];

// Dark theme styles for react-select
const darkSelectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "#1f2937", // Tailwind gray-800
    borderColor: "#374151",     // Tailwind gray-700
    color: "#f9fafb",            // Tailwind gray-50
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
    color: "#9ca3af", // Tailwind gray-400
  }),
};

const FiltersSection = () => {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [tag, setTag] = useState(tagOptions[0]);

  return (
    <div className="flex flex-col gap-4 bg-card p-8 rounded-lg shadow-md min-w-80 text-white">
      <h2 className="text-lg font-semibold">Filters</h2>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

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
    </div>
  );
};

export default FiltersSection;
