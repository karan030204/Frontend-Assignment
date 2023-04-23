import React, { useState } from 'react';
import JsonEditor from 'react-json-editor-ajrm';
import FormRenderer from './FormRenderer'; // Import the FormRenderer component

const App = () => {
  const [uiSchemaData, setUiSchemaData] = useState(null); // State to store UI schema data
  
  const handleJsonEditorChange = (data) => {
    console.log('UI schema data:', data.jsObject); // Add this line to check the updated UI schema data
    setUiSchemaData(data.jsObject); // Update state with the new UI schema data
  };

  return (
    <div>
      <h1>UI Schema Form Preview</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          {/* Render JSON editor for UI schema */}
          <h2>UI Schema Editor</h2>
          <JsonEditor
            value={uiSchemaData}
            onChange={handleJsonEditorChange}
          />
        </div>
        <div style={{ flex: '1' }}>
          {/* Render form preview using FormRenderer component */}
          <h2>Form Preview</h2>
          <FormRenderer uiSchemaData={uiSchemaData} /> {/* Pass down uiSchemaData */}
        </div>
      </div>
    </div>
  );
};

export default App;
