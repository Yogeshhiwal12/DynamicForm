import React, { useState } from "react";
import './DynamicForm.scss';

const DynamicForm = ({ schema }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <form className="form-container">
      <h2 className="form-heading">{schema.title}</h2>
      {schema.fields
        .sort((a, b) => a.order - b.order)
        .map((field) => {
          switch (field.type) {
            case "date":
              return (
                <div key={field.key} className="form-field">
                  <label>{field.label}</label>
                  <input
                    type="date"
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    readOnly={field.isReadonly}
                    required={field.isRequired}
                  />
                </div>
              );
            case "dropdown":
              return (
                <div key={field.key} className="form-field">
                  <label>{field.label}</label>
                  <select
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    readOnly={field.isReadonly}
                    required={field.isRequired}
                  >
                    <option value="">-- Select --</option>
                    {field.items.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </div>
              );
            case "number":
              return (
                <div key={field.key} className="form-field">
                  <label>{field.label}</label>
                  <div className="number-input-container">
                    <input
                      type="number"
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        handleChange(field.key, parseFloat(e.target.value))
                      }
                      readOnly={field.isReadonly}
                      required={field.isRequired}
                    />
                    {field.unit && <span>{field.unit}</span>}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
    </form>
  );
};

export default DynamicForm;
