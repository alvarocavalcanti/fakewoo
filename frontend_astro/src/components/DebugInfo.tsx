import axios from "axios";
import React, { useEffect, useState } from "react";

function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api.php");
      setDebugInfo((prevState: any) => {
        return { ...prevState, statusResponse: response.data };
      });
    };
    fetchData();
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg bg-white">
      <div className="bg-[#d5e6f8] p-4 rounded-t-lg">
        <h1 className="text-2xl font-bold text-gray-800">Debug Info</h1>
      </div>
      <div className="p-4">
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default DebugInfo;
