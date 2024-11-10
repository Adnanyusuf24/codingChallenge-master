"use client";
import { useEffect, useState } from "react";

export default function Products() {
  interface Item {
    id: number | string;
    name: string;
  }

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [spaghettiAdded, setSpaghettiAdded] = useState<boolean>(false);

  useEffect(() => {
    fetch("products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data.length) {
    return <p>No products available.</p>;
  }

  const addSpaghetti = () => {
    if (!spaghettiAdded) {
      const newData = [...data, { id: "5", name: "Spaghetti" }];
      setData(newData);
      setSpaghettiAdded(true);
    }
  };

  const removeLastItem = () => {
    const newData = [...data];
    newData.pop(); // Remove the last item
    setData(newData);

    // If the last item was Spaghetti, reset the spaghettiAdded state
    if (newData.every(item => item.name !== "Spaghetti")) {
      setSpaghettiAdded(false);
    }
  };

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={addSpaghetti} disabled={spaghettiAdded}>
        {spaghettiAdded ? "Spaghetti Added" : "Add Spaghetti"}
      </button>
      <button onClick={removeLastItem} disabled={!data.length}>
        Remove Last Item
      </button>
    </div>
  );
}
