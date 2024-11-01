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
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Wordpress Status</h2>
      <p className="text-lg mb-2">
        <strong>URL:</strong>{" "}
        <a href={wordpress?.url} className="text-blue-500 hover:underline">
          link
        </a>
      </p>
      <p className="text-lg mb-2">
        <strong>Admin URL:</strong>{" "}
        <a
          href={wordpress?.admin_url}
          className="text-blue-500 hover:underline"
        >
          link
        </a>
      </p>
      <p className="text-lg mb-2">
        <strong>Version:</strong> {wordpress?.version}
      </p>
      <p className="text-lg mb-2">
        <strong>WooCommerce Version:</strong> {wordpress?.woocommerce_version}
      </p>
    </div>
  );
}

export default WordpressStatus;
