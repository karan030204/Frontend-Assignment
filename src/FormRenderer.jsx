import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const FormRenderer = ({ uiSchemaData }) => {
  // Render the form preview using the UI schema data
  const renderFormField = (field) => {
    if (field.uiType === "Input") {
      return (
        // <input
        //   type={field.type}
        //   id={field.jsonKey}
        //   name={field.jsonKey}
        //   placeholder={field.placeholder}
        // />

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" 
          type={field.type}
            name={field.jsonKey}
            placeholder={field.placeholder} />
        </Box>
      );
    } else if (field.uiType === "Group") {
      return (
        <div>
          <h4>{field.label}</h4>
          {/* Render sub-parameters */}
          {field.subParameters && field.subParameters.map(renderFormField)}
        </div>
      );
    } else if (field.uiType === "Radio") {
      return (
        <div>
          <h4>{field.label}</h4>
          {/* Render radio options */}
          {field.validate &&
            field.validate.options &&
            field.validate.options.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  name={field.jsonKey}
                  value={option.value}
                  defaultChecked={field.validate.defaultValue === option.value}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
        </div>
      );
    } else if (field.uiType === "Select") {
      return (
        <div>
          <h4>{field.label}</h4>
          <select
            id={field.jsonKey}
            name={field.jsonKey}
            defaultValue={field.validate.defaultValue}
          >
            {/* Render select options */}
            {field.validate &&
              field.validate.options &&
              field.validate.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>
      );
    } else if (field.uiType === "Switch") {
      return (
        <div>
          <h4>{field.label}</h4>
          <input
            type="checkbox"
            id={field.jsonKey}
            name={field.jsonKey}
            defaultChecked={field.validate.defaultValue}
          />
          <label htmlFor={field.jsonKey}></label>
        </div>
      );
    } else if (field.uiType === "Ignore") {
      // Render ignored field
      return null;
    }

    return null;
  };

  return (
    <div>
      <h3>Form Preview</h3>
      {/* Render the form using the UI schema data */}
      {/* You can customize the rendering logic based on your UI schema data */}
      {/* For example, you can loop through the UI schema data and render form fields accordingly */}
      {uiSchemaData && (
        <form>
          {uiSchemaData.map(renderFormField)}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default FormRenderer;
