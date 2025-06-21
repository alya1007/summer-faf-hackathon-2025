  import React, { useEffect, useState } from 'react';
  import { jwtDecode } from 'jwt-decode';
  import Navbar from '../components/navbar/navbar';
  import Select from 'react-select';
  import makeAnimated from 'react-select/animated';
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
    icon: string;
    color: string;
  }

  const getToken = () => localStorage.getItem('token');

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
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'game_dev', label: 'Game Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'docs', label: 'Documentation' },
  ];

  localStorage.setItem("Domains", JSON.stringify(options))  

  const languages: Language[] = [
    { id: 'c#', name: 'C#', icon: '🔧', color: 'bg-gray-700' },
    { id: 'python', name: 'Python', icon: '🧠', color: 'bg-gray-700' },
    { id: 'java', name: 'Java', icon: 'C', color: 'bg-blue-600' },
    { id: 'js', name: 'JS', icon: 'CF', color: 'bg-red-600' },
    { id: 'go', name: 'Go', icon: '🌀', color: 'bg-green-600' },
  ];
  
  localStorage.setItem("Langiages", JSON.stringify(languages))

  const Profile: React.FC = () => {
    // const [username, setUsername] = useState<string | null>(null);
    const [username, setUsername] = useState('maria-afteni')
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    useEffect(() => {
      // const token = getToken();
      // if (!token) return;

      // const name = getUsername(token);
      // setUsername(name);

      fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then((data: GitHubUser) => setAvatarUrl(data.avatar_url))
        .catch(err => console.error('Failed to fetch GitHub profile:', err));
    }, []);

      const toggleLanguage = (languageId: string) => {
    setSelectedLanguages(prev => 
      prev.includes(languageId) 
        ? prev.filter(id => id !== languageId)
        : [...prev, languageId]
    );
  };

  const clearAll = () => {
    setSelectedLanguages([]);
  };

  const selectAll = () => {
    setSelectedLanguages(languages.map(lang => lang.id));
  };

    return (  
      <div>
        <Navbar />

       <div className="relative px-8 py-8">
            
          <div className="absolute top-15 left-1/5 transform -translate-x-1/2">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={`${username}'s avatar`}
                className="w-70 h-80  border-4 border-white shadow-lg object-cover hover:scale-110 transition-transform duration-300"
              />
            )}
        </ div>
      </div>

      <div className="pt-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">
        Welcome, {username}!</h1>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-5"></div>
        </div>
      
      <div>
            
      </div>
        <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={options}
        isMulti
        placeholder="Select your interests"
        className="w-full max-w-md mx-auto mt-6 text-sm"
         styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
              boxShadow: state.isFocused ? '0 0 0 2px rgba(99, 102, 241, 0.5)' : 'none',
              padding: '0.375rem 0.75rem', 
              cursor: 'pointer',
            }),
            menu: (base) => ({
              ...base,
              zIndex: 50,
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            }),
            option: (base, state) => ({
              ...base,
              padding: '0.5rem 1rem',
              backgroundColor: state.isFocused ? '#f3f4f6' : 'white', 
              color: '#111827', 
              cursor: 'pointer',
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: '#e0e7ff', 
              borderRadius: '0.25rem',
              padding: '0 0.25rem',
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: '#1e3a8a', 
              fontWeight: '500',
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: '#1e3a8a',
              ':hover': {
                backgroundColor: '#c7d2fe', 
                color: '#1e3a8a',
              },
            }),
          }}
      />

<div className="mt-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose the languages you wish to train on:</h1>
          <div className="flex gap-4 mb-6">
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
            >
              Clear All
            </button>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Selected:</span>
              <span className="font-bold text-blue-400">{selectedLanguages.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => toggleLanguage(language.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 group
                ${selectedLanguages.includes(language.id)
                  ? 'border-blue-400 bg-blue-900/30 shadow-lg shadow-blue-500/20'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                }
              `}
            >
              {/* Selection indicator */}
              {selectedLanguages.includes(language.id) && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Language icon */}
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-lg ${language.color} flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform`}>
                  {language.icon}
                </div>
                <span className="text-sm font-medium text-center">{language.name}</span>
              </div>
            </button>
          ))}
        </div>
      
      </div>
      </div>
      </div>

      
    );
  };
  export default Profile;