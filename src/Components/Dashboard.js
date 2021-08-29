import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "./Item";

function Dashboard() {
  const [itemsData, setItemData] = useState([]);
  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/05e9651d-528e-4d7c-a60b-bae8f09684c6")
      .then((res) => setItemData(res.data.products));
  }, []);
  return (
    <div>
      <div className="headerBar commonPadding">My store</div>
      <div className="itemsContainer">
        {itemsData.map((el) => (
          <Item item={el} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
