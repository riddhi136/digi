import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeName, setNodeName] = useState("");

  useEffect(() => {
    // Load data from JSON file when the component mounts
    // You can fetch the data using axios or fetch
    // For simplicity, we'll just import it here
    import("./data.json").then((jsonData) => {
      setData(jsonData.nodes);
    });
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleAddNode = () => {
    if (nodeName.trim() === "") return;
    const newNode = {
      id: data.length + 1,
      name: nodeName,
      children: [],
    };
    setData([...data, newNode]);
    setNodeName("");
  };

  const handleUpdateNode = () => {
    if (!selectedNode || nodeName.trim() === "") return;
    const updatedData = data.map((node) =>
      node.id === selectedNode.id ? { ...node, name: nodeName } : node
    );
    setData(updatedData);
    setNodeName("");
    setSelectedNode(null);
  };

  const handleDeleteNode = () => {
    if (!selectedNode) return;
    const updatedData = data.filter((node) => node.id !== selectedNode.id);
    setData(updatedData);
    setNodeName("");
    setSelectedNode(null);
  };

  return (
    <div className="App">
      <h1>Hierarchical Dropdown</h1>
      <div className="dropdown">
        <select onChange={(e) => handleNodeClick(JSON.parse(e.target.value))}>
          <option value="">Select a node</option>
          {data.map((node) => (
            <option key={node.id} value={JSON.stringify(node)}>
              {node.name}
            </option>
          ))}
        </select>
        <div className="button-container">
          <button onClick={handleAddNode}>Add</button>
          <button onClick={handleUpdateNode}>Update</button>
          <button onClick={handleDeleteNode}>Delete</button>
        </div>
        <input
          type="text"
          placeholder="Write Node Name here"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
