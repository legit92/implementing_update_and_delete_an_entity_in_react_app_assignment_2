import React, { useState, useEffect } from "react";
import ItemList from "./components/ItemList";

// The URL of your backend
const API_URI = "http://localhost:8000/doors";

function App() {
  // State to hold items and any potential error
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  // Fetch the list of doors when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URI);
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data); // Store the fetched data in the state
      } catch (err) {
        setError(err.message); // Handle any errors
      }
    };

    fetchItems();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Delete an item from the list
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      // Remove the deleted item from the list in the state
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message); // Handle any errors
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ItemList items={items} deleteItem={deleteItem} />
    </div>
  );
}

export default App;