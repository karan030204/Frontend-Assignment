import React, { useEffect, useState } from "react";
import JsonEditor from "react-json-editor-ajrm";
import FormRenderer from "./FormRenderer"; // Import the FormRenderer component
import './App.css'

const App = () => {
  const [uiSchemaData, setUiSchemaData] = useState(null); // State to store UI schema data

  const handleJsonEditorChange = (data) => {
    setUiSchemaData(data.jsObject); // Update state with the new UI schema data
  };

  return (
    <div>
      <h1 style={{margin:"1em"}}>UI Schema Form Preview</h1>
      <div style={{ display: "flex" }} className="container">
        <div style={{ width: "40%", margin: "1em" }} className="json-editor">
          {/* Render JSON editor for UI schema */}
          <h2>UI Schema Editor</h2>
          <JsonEditor className="json" value={uiSchemaData} onChange={handleJsonEditorChange} />
        </div>
        <div
          className="form"
          style={{
            // width: "50%",
            // border: "1px solid black",
            // padding: "16px",
            borderRadius: "4px",
          }}
        >
          {/* Render form preview using FormRenderer component */}
          <FormRenderer uiSchemaData={uiSchemaData} />{" "}
          {/* Pass down uiSchemaData */}
        </div>
      </div>
    </div>
  );
};

export default App;
