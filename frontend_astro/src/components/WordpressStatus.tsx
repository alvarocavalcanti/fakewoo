import { useState, useEffect } from "react";
import axios from "axios";

interface Wordpress {
  version: string;
  woocommerce_version: string;
  url: string;
  admin_url: string;
}

function WordpressStatus() {
  const [wordpress, setWordpress] = useState<Wordpress>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api.php");
      setWordpress(response.data.wordpress);
    };
    fetchData();
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg bg-white">
      <div className="bg-[#d5e6f8] p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold text-gray-800">Wordpress Status</h2>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-lg">
          <strong>URL:</strong>{" "}
          <a href={wordpress?.url} className="text-blue-500 hover:underline">
            link
          </a>
        </p>
        <p className="text-lg">
          <strong>Admin URL:</strong>{" "}
          <a
            href={wordpress?.admin_url}
            className="text-blue-500 hover:underline"
          >
            link
          </a>
        </p>
        <p className="text-lg">
          <strong>Version:</strong> {wordpress?.version}
        </p>
        <p className="text-lg">
          <strong>WooCommerce Version:</strong> {wordpress?.woocommerce_version}
        </p>
      </div>
    </div>
  );
}

export default WordpressStatus;
