import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/navbar/navbar";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { SiSharp, SiPython, SiJavascript, SiGo } from "react-icons/si";
import { DiJava } from "react-icons/di";


// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

interface JwtPayload {
  username: string;
}

interface GitHubUser {
  avatar_url: string;
}

interface Language {
  id: string;
  name: string;
  icon: React.ReactNode ;
  color: string;
}

const getToken = () => localStorage.getItem("token");

const getUsername = (token: string): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.username;
  } catch {
    return null;
  }
};

const animatedComponents = makeAnimated();

const options = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "game_dev", label: "Game Development" },
  { value: "mobile", label: "Mobile Development" },
  { value: "docs", label: "Documentation" },
];

localStorage.setItem("Domains", JSON.stringify(options));

const languages: Language[] = [
  { id: "c#", name: "C#", icon:  <SiSharp className="text-purple-800"  size={24}/>, color: "bg-purple-100" },
  { id: "python", name: "Python", icon: <SiPython className="text-blue-800" size={24}/>, color: "bbg-blue-200 " },
  { id: "java", name: "Java", icon: <DiJava className="text-red-800" size={36}/>, color: "bg-red-100 " },
  { id: "js", name: "JS", icon: <SiJavascript className="text-yellow-900" size={24}/>, color: "bg-yellow-200 " },
  { id: "go", name: "Go", icon: <SiGo className="text-cyan-800" size={36}/> , color: "bg-cyan-100" },
];

localStorage.setItem("Languages", JSON.stringify(languages));

const Profile: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const name = getUsername(token);
    setUsername(name);

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data: GitHubUser) => setAvatarUrl(data.avatar_url))
      .catch((err) => console.error("Failed to fetch GitHub profile:", err));
  }, []);

  const toggleLanguage = (languageId: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId]
    );
  };

  const clearAll = () => {
    setSelectedLanguages([]);
  };

  const selectAll = () => {
    setSelectedLanguages(languages.map((lang) => lang.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:pl-22 pt-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-2">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={`${username}'s avatar`}
                className="w-90 h-90 rounded-full border-4 border-white shadow-2xl object-cover hover:scale-105 transition-transform duration-300"
              />
            )}
            {/* <div className="absolute inset-0 rounded-full"></div>
                    <div className="absolute bottom-6 right-12 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div> */}

            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {username}
                </span>
                !
              </h1>

              <div className="mt-6 flex justify-start">
                <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>

              <div className="max-w-4xl  pl-4 sm:pl-6 lg:pl-10 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      What interests you?
                    </h2>
                  </div>

                  <div className="max-w-md  "></div>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={options}
                    isMulti
                    placeholder="Select your interests"
                    className="w-full mt-6 text-sm"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        borderColor: state.isFocused ? "#6366f1" : "#d1d5db",
                        boxShadow: state.isFocused
                          ? "0 0 0 2px rgba(99, 102, 241, 0.5)"
                          : "none",
                        padding: "0.375rem 0.75rem",
                        cursor: "pointer",
                      }),
                      menu: (base) => ({
                        ...base,
                        zIndex: 50,
                        borderRadius: "0.5rem",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      }),
                      option: (base, state) => ({
                        ...base,
                        padding: "0.5rem 1rem",
                        backgroundColor: state.isFocused ? "#f3f4f6" : "white",
                        color: "#111827",
                        cursor: "pointer",
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#e0e7ff",
                        borderRadius: "0.25rem",
                        padding: "0 0.25rem",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#1e3a8a",
                        fontWeight: "500",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: "#1e3a8a",
                        ":hover": {
                          backgroundColor: "#c7d2fe",
                          color: "#1e3a8a",
                        },
                      }),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-8">
        <div className="ml-80 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose the languages you wish to train on:
          </h1>
          <div className="flex flex-wrap mx-auto gap-4 mb-8 mt-8">
            <button
              onClick={selectAll}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Clear All
            </button>
            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
              <span className="text-gray-700 font-medium">Selected:</span>
              <span className="font-bold text-purple-600 text-lg">
                {selectedLanguages.length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mb-8 w-250 h-4 mx-auto rounded-5xl ">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => toggleLanguage(language.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 group shadow-xl
                ${
                  selectedLanguages.includes(language.id)
                    ? "border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg shadow-purple-200"
                    : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg"
                }
              `}
            >

              {selectedLanguages.includes(language.id) && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              <div className="flex flex-col items-center space-y-2 ">
                <div
                  className={`w-16 h-16 rounded-xl ${language.color} flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform shadow-lg`}
                >
                  {language.icon}
                </div>
                <span className="text-sm font-medium text-center text-black">
                  {language.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>
    </div>
  );
};
export default Profile;
