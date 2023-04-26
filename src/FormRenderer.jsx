import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";


const FormRenderer = ({ uiSchemaData }) => {
  const [alignment, setAlignment] = useState("naples");
  const [isAdvanceToppingClicked, setIsAdvanceToppingClicked] =
    React.useState(false);

  const [isAdvanceClicked, setIsAdvanceClicked] = React.useState(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // Render the form preview using the UI schema data
  const renderFormField = (field) => {
    if (field.uiType === "Input") {
      if (field.jsonKey === "type") {
        // Render custom UI for jsonKey === "type" if needed
      } else {
        return (
          <div
            style={{
              display: "flex",
              gap: "300px",
              borderRadius: "0.7em",
              marginBottom: "0.7rem",
              backgroundColor: "rgb(244, 244, 244)",
              boxShadow: "1px 2px 2px 1px rgb(225, 225, 225)",
              padding: "0.8rem",
              overflow: "hidden",
            }}
          >
            <h4
              style={{
                flex: "0 0 auto",
                margin: "0",
                minWidth: "0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {field.label}
            </h4>
    
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, minWidth: 0 },
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                maxWidth: "100%",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Pizza Name"
                variant="outlined"
                type={field.type}
                name={field.jsonKey}
                placeholder={field.placeholder}
              />
            </Box>
          </div>
        );
      }
    
    
    } else if (field.uiType === "Group") {
      if (field.jsonKey === "toppings" || field.jsonKey === "pizza_type") {
        return (
          <div
            style={{
              marginBottom: "0.7rem",
              backgroundColor: "rgb(244, 244, 244)",
              borderRadius: "0.7em",

              boxShadow: "1px 2px 2px 1px rgb(225, 225, 225)",
              padding: "0.8rem",
            }}
          >
            <h4
              style={{
                borderBottom: "1px solid rgb(235, 235, 235)",
                paddingBottom: "12px",
              }}
            >
              {field.label}
            </h4>

            {/* Render sub-parameters */}
            {field.subParameters && field.subParameters.map(renderFormField)}
          </div>
        );
      } else if (field.jsonKey !== "toppings") {
        return (
          <div>
            {/* Render sub-parameters */}
            {field.subParameters && field.subParameters.map(renderFormField)}
          </div>
        );
      }
    } else if (field.uiType === "Radio") {
      return (
        <div
          style={{ display: "flex", margin: "1em",alignItems:"center",justifyContent:"center" }}
        >
          {field.validate &&
            field.validate.options &&
            field.validate.options.map((option) => (
              <div key={option.value}>
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label={field.label}
                >
                  <ToggleButton
                    value={option.value}
                    className="text-black"
                    style={{
                      borderRadius: " 0.2rem ",
                      backgroundColor: "white",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {option.label}
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            ))}
        </div>
      );
    } else if (field.uiType === "Select") {
      if (
        field.uiType === "Select" &&
        field.jsonKey === "second_topping" &&
        isAdvanceToppingClicked === true
      ) {
        return (
          <div style={{ display: "flex" }}>
            <h4 style={{ width: "90%" }}>{field.label}</h4>
            <FormControl sx={{ flex: "1", minWidth: "50%" }}>
              <InputLabel id={field.jsonKey}>{field.label}</InputLabel>
              <Select
                labelId={field.jsonKey}
                id={field.jsonKey}
                value={field.value} // Use field.value instead of age
                label={field.label}
                // onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {field.validate &&
                  field.validate.options &&
                  field.validate.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>
                {field.validate && field.validate.helperText}
              </FormHelperText>{" "}
              {/* Check for field.validate before accessing helperText */}
            </FormControl>
          </div>
        );
      } else if (
        field.uiType === "Select" &&
        field.jsonKey !== "second_topping" &&
        field.jsonKey !== "size"
      ) {
        return (
          <div style={{ display: "flex" }}>
            <h4 style={{ width: "90%" }}>{field.label}</h4>
            <FormControl sx={{ flex: "1", minWidth: "50%" }}>
              <InputLabel id={field.jsonKey}>{field.label}</InputLabel>
              <Select
                labelId={field.jsonKey}
                id={field.jsonKey}
                value={field.value} // Use field.value instead of age
                label={field.label}
                // onChange={()=>handleChange()}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {field.validate &&
                  field.validate.options &&
                  field.validate.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>
                {field.validate && field.validate.helperText}
              </FormHelperText>{" "}
              {/* Check for field.validate before accessing helperText */}
            </FormControl>
          </div>
        );
      } else if (
        field.uiType === "Select" &&
        field.jsonKey === "size" &&
        isAdvanceClicked === true
      ) {
        return (
          <div
            style={{
              display: "flex",
              borderRadius: "0.7em",
              
              marginBottom: "0.7rem",
              backgroundColor: "rgb(244, 244, 244)",
              boxShadow: "1px 2px 2px 1px rgb(225, 225, 225)",
              padding: "0.8rem",
            }}
          >
            <h4 style={{ width: "90%" }}>{field.label}</h4>
            <FormControl sx={{ flex: "1", minWidth: "50%" }}>
              <InputLabel id={field.jsonKey}>{field.label}</InputLabel>
              <Select
                labelId={field.jsonKey}
                id={field.jsonKey}
                value={field.value} // Use field.value instead of age
                label={field.label}
                // onChange={()=>handleChange()}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {field.validate &&
                  field.validate.options &&
                  field.validate.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>
                {field.validate && field.validate.helperText}
              </FormHelperText>{" "}
              {/* Check for field.validate before accessing helperText */}
            </FormControl>
          </div>
        );
      }
    } else if (field.uiType === "Switch") {
      if (field.uiType === "Switch" && field.jsonKey === "include_seasonings") {
        return (
          <>
            <div style={{ display: "flex" }}>
              <h4>{field.label}</h4>

              <Checkbox
                {...label}
                id={field.jsonKey}
                name={field.jsonKey}
                defaultChecked={field.validate.defaultValue}
              />
              <label htmlFor={field.jsonKey}></label>
            </div>
            <div style={{ display: "flex" }}>
              <h4>Show Advanced Fields</h4>
              <Switch
                {...label}
                onChange={() =>
                  setIsAdvanceToppingClicked(!isAdvanceToppingClicked)
                }
                checked={isAdvanceToppingClicked}
              />
            </div>
          </>
        );
      } else if (
        field.uiType === "Switch" &&
        field.jsonKey !== "include_seasonings"
      ) {
        return (
          <div style={{ display: "flex" }}>
            <h4>{field.label}</h4>
            {/* <input
              type="checkbox"
              id={field.jsonKey}
              name={field.jsonKey}
              defaultChecked={field.validate.defaultValue}
            /> */}
            <Checkbox
              {...label}
              id={field.jsonKey}
              name={field.jsonKey}
              defaultChecked={field.validate.defaultValue}
            />
            <label htmlFor={field.jsonKey}></label>
          </div>
        );
      }
    } else if (field.uiType === "Ignore") {
      // Render ignored field
    }

    // Update the code to handle the "naples" alignment
    if (alignment === "naples" && field.jsonKey === "Naples") {
      return (
        <div>
          {/* Render sub-parameters for Naples Style Pizza */}
          {field.subParameters && field.subParameters.map(renderFormField)}
        </div>
      );
    }

    if (isAdvanceToppingClicked && field.jsonKey === "second_topping") {
      return (
        <div>
          {/* Render sub-parameters for Naples Style Pizza */}
          {field.subParameters && field.subParameters.map(renderFormField)}
        </div>
      );
    }

    // Update the code to handle the "naples" alignment
    if (alignment === "newyork" && field.jsonKey === "NewYork") {
      return (
        <div>
          {/* Render sub-parameters for Naples Style Pizza */}
          {field.subParameters && field.subParameters.map(renderFormField)}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="Form"
      style={{
        backgroundColor: "rgb(253, 253, 253)",

        boxShadow: "2px 2px 2px 2px rgb(239,239,239)",
        border: "1px solid transparent",
        padding: "2rem",
        margin: "1rem",
        borderRadius: "1rem",
      }}
    >
      <h3>Form Preview</h3>
      {/* Render the form using the UI schema data */}
      {/* You can customize the rendering logic based on your UI schema data */}
      {/* For example, you can loop through the UI schema data and render form fields accordingly */}
      {uiSchemaData && (
       <form style={{ maxWidth: "100%" }}>
       {uiSchemaData.map(renderFormField)}
     
       <div
         style={{
           display: "flex",

           flexDirection: "column",
           alignItems: "left",
         }}
       >
         <h4 style={{ marginBottom: "1em" }}>
           Show Advanced Fields
           <Switch
             {...label}
             onChange={() => setIsAdvanceClicked(!isAdvanceClicked)}
             checked={isAdvanceClicked}
           />
         </h4>
         <Stack spacing={2} direction="row" style={{ width: "100%" }}>
           <Button variant="contained" style={{ flex: "1 0", minWidth: 0 }}>
             Submit
           </Button>
         </Stack>
       </div>
     </form>
      )}

    
    </div>
  );
};

export default FormRenderer;
