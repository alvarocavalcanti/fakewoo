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
  const [loading, setLoading] = useState(null);
  const [searchResults, setSearchResults] = useState<Plugin[]>([]);
  const handleInstall = async (slug: any) => {
    setLoading(slug);
    await installPlugin(slug);
    setLoading(null);
  };
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
    <div className="border border-gray-300 rounded-lg shadow-lg bg-white max-h-[400px] overflow-y-auto">
      <div className="bg-[#d5e6f8] p-4 rounded-t-lg sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">Plugin Search</h1>
      </div>
      <div className="p-4">
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a plugin"
          onChange={onChangeInput}
        />
        <div>
          {searchResults.length > 0 && (
            <h2 className="text-lg font-semibold mb-2">Found Plugins:</h2>
          )}
          {searchResults?.map((plugin, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-semibold">{plugin.name}</h2>
              <p className="text-sm text-gray-600">Version: {plugin.version}</p>
              <div className="flex items-center space-x-4 text-sm text-blue-500">
                <a href={plugin.homepage} className="hover:underline">
                  Homepage
                </a>
                <button
                  onClick={() => handleInstall(plugin.slug)}
                  disabled={loading === plugin.slug}
                  className="relative bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  {loading === plugin.slug ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Install"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PluginSearch;
