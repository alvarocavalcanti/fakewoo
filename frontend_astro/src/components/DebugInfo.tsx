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
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Debug Info</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}

export default DebugInfo;
