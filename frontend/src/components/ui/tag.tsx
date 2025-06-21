import React from "react";
import { SiSharp, SiPython, SiJavascript, SiGo } from "react-icons/si";
import { DiJava } from "react-icons/di";

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
    color: "bg-blue-200 text-blue-800",
  },
  java: {
    icon: <DiJava className="mr-1" size={16} />,
    color: "bg-red-100 text-red-800",
  },
  js: {
    icon: <SiJavascript className="mr-1" size={16} />,
    color: "bg-yellow-200 text-yellow-900",
  },
  go: {
    icon: <SiGo className="mr-1" size={16} />,
    color: "bg-cyan-100 text-cyan-800",
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