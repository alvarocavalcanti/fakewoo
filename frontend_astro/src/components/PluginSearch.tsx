import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface Plugin {
  name: string;
  slug: string;
  author: string;
  homepage: string;
  version: string;
}

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

function PluginSearch() {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Plugin[]>([]);

  const debouncedSearch = useCallback(
    debounce(async (input: string) => {
      if (input.length <= 3) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/api.php?search_plugin=${input}`
        );
        console.log(response.data);
        setSearchResults(response.data as Plugin[]);
      } catch (error) {
        console.error("Error searching plugins:", error);
      }
    }, 500),
    []
  );

  const installPlugin = async (slug: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api.php?plugin_to_install=${slug}`
      );
      console.log(response.data);
      alert("Succesfully installed plugin");
    } catch (error) {
      console.error("Error installing plugin:", error);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    debouncedSearch(input);
  }, [input, debouncedSearch]);

  return (
    <div>
      <h1  className="text-2xl font-bold mb-4">Plugin Search</h1>
      <input        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
 placeholder="Search for a plugin" onChange={onChangeInput} />
      <div>
        {searchResults.length > 0 && <h2>Found Plugins:</h2>}
        {searchResults?.map((plugin, index) => (
          <div
            key={index}
            className="p-4 mb-4 border border-gray-300 rounded shadow-sm space-y-2"
          >
            <h2>{plugin.name}</h2>
            <h3>{plugin.author?.split(">")[1]?.split("<")[0]}</h3>
            <h3>{plugin.version}</h3>
            <a href={plugin.homepage} className="text-blue-500 hover:underline">
              Homepage
            </a>
            <button
              onClick={() => installPlugin(plugin.slug)}
              className="ml-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Install
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PluginSearch;
