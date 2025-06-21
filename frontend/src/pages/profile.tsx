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

  const getToken = () => localStorage.getItem('token');

  const getUsername = (token: string): string | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.username;
    } catch {
      return null;
    }
  };

  const Profile: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
      const token = getToken();
      if (!token) return;

      const name = getUsername(token);
      setUsername(name);

      fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then((data: GitHubUser) => setAvatarUrl(data.avatar_url))
        .catch(err => console.error('Failed to fetch GitHub profile:', err));
    }, []);

    const animatedComponents = makeAnimated();

    const options = [
      { value: 'frontend', label: 'Frontend' },
      { value: 'backend', label: 'Backend' },
      { value: 'game_dev', label: 'Game Development' },
      { value: 'mobile', label: 'Mobile Development' },
      { value: 'docs', label: 'Documentation' },
    ];



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
      </div>
    );
  };
  export default Profile;