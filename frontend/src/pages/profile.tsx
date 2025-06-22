import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { SiSharp, SiPython, SiJavascript, SiGo } from "react-icons/si";
import { DiJava } from "react-icons/di";
import { useAuth } from "../context/auth-context";

interface Language {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const getToken = () => localStorage.getItem("access_token");

const animatedComponents = makeAnimated();

const options = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "game_dev", label: "Game Development" },
  { value: "mobile", label: "Mobile Development" },
  { value: "docs", label: "Documentation" },
];

const languages: Language[] = [
  {
    id: "c#",
    name: "C#",
    icon: <SiSharp className="text-purple-800" size={24} />,
    color: "bg-purple-100",
  },
  {
    id: "python",
    name: "Python",
    icon: <SiPython className="text-blue-800" size={24} />,
    color: "bg-blue-200",
  },
  {
    id: "java",
    name: "Java",
    icon: <DiJava className="text-red-800" size={36} />,
    color: "bg-red-100",
  },
  {
    id: "javascript",
    name: "JS",
    icon: <SiJavascript className="text-yellow-900" size={24} />,
    color: "bg-yellow-200",
  },
  {
    id: "go",
    name: "Go",
    icon: <SiGo className="text-cyan-800" size={36} />,
    color: "bg-cyan-100",
  },
];

const Profile: React.FC = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<
    { value: string; label: string }[]
  >([]);

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      if (user.pref_langs) {
        setSelectedLanguages(user.pref_langs);
      }
  
      if (user.pref_domains) {
        const matchedDomains = options.filter((opt) =>
          user.pref_domains.includes(opt.value)
        );
        setSelectedInterests(matchedDomains);
      }
    }
  }, [user]);
  
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

  const handleSubmit = async () => {
    const token = getToken();
    if (!token) return;

    const payload = {
      pref_langs: selectedLanguages,
      pref_domains: selectedInterests.map((item) => item.value),
    };

    console.log(JSON.stringify(payload));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/update-user-prefs/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }

      const data = await response.json();
      console.log("Preferences updated:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:pl-22 pt-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-2">
          {user && (
            <img
              src={user.profile_pic_url}
              alt={`${user.username}'s avatar`}
              className="w-90 h-90 rounded-full border-4 border-white shadow-2xl object-cover hover:scale-105 transition-transform duration-300"
            />
          )}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-purple-300 to-indigo-500 bg-clip-text text-transparent">
                {user?.username}
              </span>
              !
            </h1>
            <div className="mt-6 flex justify-start">
              <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full"></div>
            </div>

            <div className="max-w-4xl pl-4 sm:pl-6 lg:pl-10 py-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    What interests you?
                  </h2>
                </div>

                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={options}
                  isMulti
                  value={selectedInterests}
                  onChange={(selected) =>
                    setSelectedInterests(
                      selected as { value: string; label: string }[]
                    )
                  }
                  placeholder="Select your interests"
                  className="w-full mt-6 text-sm text-black"
                />
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
              className="px-6 py-3 bg-gradient-to-r from-purple-300 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:bg-indigo-700 transition-all duration-200 shadow-lg"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mb-8 w-250 h-4 mx-auto rounded-5xl">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => toggleLanguage(language.id)}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 group shadow-xl ${selectedLanguages.includes(language.id)
                ? "border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50 shadow-purple-200"
                : "border-gray-200 bg-white hover:border-purple-300"
                }`}
            >
              <div className="flex flex-col items-center space-y-2">
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

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-gradient-to-r from-purple-400 to-indigo-600 text-white mt-15 rounded-xl font-semibold hover:from-purple-500 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-xl"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Profile;
