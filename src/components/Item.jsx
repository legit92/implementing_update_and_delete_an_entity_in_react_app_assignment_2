import React from "react";

const Item = ({ item, deleteItem }) => {
  return (
    <div>
      <p>{item.name}</p> {/* Assuming the item has a 'name' property */}
      <button onClick={() => deleteItem(item.id)}>Delete</button>
    </div>
  );
};

export default Item;