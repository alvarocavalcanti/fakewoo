import React, { useEffect, useState } from "react";
import axios from "axios";

interface installedPlugin {
  name: string;
  version: string;
}

function InstalledPlugins() {
  const [installedPlugins, setInstalledPlugins] = useState<installedPlugin[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api.php");
     
      setInstalledPlugins(response.data.plugins);
    };
    fetchData();
  }, []);

  const onClickUninstall = async (slug: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api.php?plugin_to_uninstall=${name}`
      );
      console.log(response.data);
      alert("Succesfully uninstalled plugin");
    } catch (error) {
      console.error("Error uninstalling plugin:", error);
    }
}  

  return (
    <div className="p-4 border-2 border-gray-300 rounded shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Installed Plugins</h1>
      {installedPlugins.map((plugin, index) => (
        <div
          key={index}
          className="p-4 mb-4 border border-gray-300 rounded space-y-2"
        >
          <h2 className="text-lg font-semibold">{plugin.name}</h2>
          <h3 className="text-gray-600">{plugin.version}</h3>
        </div>
      ))}
    </div>
  );
}

export default InstalledPlugins;
