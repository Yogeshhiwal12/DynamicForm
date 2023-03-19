import React, { useState } from "react";
import DynamicForm from "./DynamicForm";
import drug1 from "./drug1.json";
import drug2 from "./drug2.json";
import './App.scss';

const App = () => {
  const [selectedDrug, setSelectedDrug] = useState(null);

  const handleDrugChange = (event) => {
    setSelectedDrug(event.target.value);
  };

  const renderForm = () => {
    if (selectedDrug === "drug1") {
      return <DynamicForm schema={drug1} />;
    } else if (selectedDrug === "drug2") {
      return <DynamicForm schema={drug2} />;
    } else {
      return null;
    }
  };

  return (
    <div className="select-container">
      <h1 htmlFor="drug-select">Select a drug:</h1>
      <select id="drug-select" onChange={handleDrugChange}>
        <option value="">-- Select a drug --</option>
        <option value="drug1">Drug 1</option>
        <option value="drug2">Drug 2</option>
      </select>
      {renderForm()}
    </div>
  );
};

export default App;
