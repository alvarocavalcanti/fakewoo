import React, { useEffect, useState } from "react";
import axios from "axios";

function ContainersRunnings() {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api.php");
      console.log(response.data.containers);
      setContainers(response.data.containers);
    };
    fetchData();
  }, []);

  return (
<div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
  <h1 className="text-2xl font-bold mb-4">Containers Runnings</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {containers.map((container: any) => {
      return (
        <div key={container.id} className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-lg font-semibold mb-2">{container.name}</h2>
          <h3 className="text-gray-600">{container.status}</h3>
        </div>
      );
    })}
  </div>
</div>
  );
}

export default ContainersRunnings;