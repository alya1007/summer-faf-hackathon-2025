import React from "react";
import {
  SiSharp, SiPython, SiJavascript, SiTypescript, SiRuby,
  SiHtml5, SiCss3, SiPhp, SiGo, SiCplusplus, SiDart, SiGnubash,
  SiQt, SiC
} from "react-icons/si";
import { DiJava, DiWindows } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";



const tagStyles: Record<
  string,
  { color: string; icon: React.ReactNode }
> = {
  "c#": {
    icon: <SiSharp className="mr-1" size={16} />,
    color: "bg-purple-100 text-purple-800",
  },
  python: {
    icon: <SiPython className="mr-1" size={16} />,
    color: "bg-blue-200 text-blue-700",
  },
  java: {
    icon: <DiJava className="mr-1" size={16} />,
    color: "bg-red-100 text-red-800",
  },
  javascript: {
    icon: <SiJavascript className="mr-1" size={16} />,
    color: "bg-yellow-200 text-yellow-900",
  },
  go: {
    icon: <SiGo className="mr-1" size={16} />,
    color: "bg-cyan-100 text-cyan-800",
  },
  typescript: {
    icon: <SiTypescript className="mr-1" size={16} />,
    color: "bg-blue-100 text-blue-900",
  },
  ruby: {
    icon: <SiRuby className="mr-1" size={16}/>,
    color: "bg-red-200 text-red-900",
  },
  html:{
    icon: <SiHtml5 className="mr-1" size={16}/>,
    color: "bg-orange-200 text-orange-900",
  }, 
  css: {
    icon: <SiCss3 className="mr-1" size={16}/>,
    color: "bg-purple-200 text-purple-900",
  }, 
  php: {
    icon: <SiPhp className="mr-1" size={16}/>,
    color: "bg-purple-100 text-purple-800",
  },
  "c++": {
    icon: <SiCplusplus className="mr-1" size={16} />,
    color: "bg-indigo-100 text-indigo-800",
  },
  dart: {
    icon: <SiDart className="mr-1" size={16} />,
    color: "bg-cyan-200 text-cyan-900",
  },
  assembly: {
    icon: <SiGnubash className="mr-1" size={16} />,
    color: "bg-gray-300 text-gray-900",
  },
  shell: {
    icon: <SiGnubash className="mr-1" size={16} />,
    color: "bg-green-100 text-green-800",
  },
  vbnet: {
    icon: <VscVscode className="mr-1" size={16} />,
    color: "bg-indigo-200 text-indigo-900",
  },
  qmake: {
    icon: <SiQt className="mr-1" size={16} />,
    color: "bg-green-200 text-green-900",
  },
  c: {
    icon: <SiC className="mr-1" size={16} />,
    color: "bg-blue-50 text-blue-800",
  },
  "objective-c": {
    icon: <SiC className="mr-1" size={16} />,
    color: "bg-gray-100 text-gray-900",
  },
  "objective-c++": {
    icon: <SiCplusplus className="mr-1" size={16} />,
    color: "bg-gray-200 text-gray-900",
  },
  nsis: {
    icon: <DiWindows className="mr-1" size={16} />,
    color: "bg-blue-100 text-blue-900",
  },
  makefile: {
    icon: <SiGnubash className="mr-1" size={16} />,
    color: "bg-gray-200 text-gray-800",
  },
};




interface TagProps {
  label: string;
  onRemove?: () => void;
}

const Tag: React.FC<TagProps> = ({ label, onRemove }) => {
  const key = label.toLowerCase();
  const style = tagStyles[key] || {
    color: "bg-gray-200 text-gray-800",
    icon: null,
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${style.color}`}
    >
      {style.icon}
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 text-gray-500 hover:text-red-600"
        >
          &times;
        </button>
      )}
    </span>
  );
};
export default Tag;  