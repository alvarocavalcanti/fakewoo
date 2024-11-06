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
    <div className=" bg-white">
      <div className="bg-[#d5e6f8] p-4 rounded-t-lg">
        <h1 className="text-2xl font-bold text-gray-800">Containers Running</h1>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {containers.map((container: any) => (
          <div key={container.id} className="p-2">
            <h2 className="text-lg font-semibold">{container.name}</h2>
            <h3 className="text-gray-600">{container.status}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContainersRunnings;
