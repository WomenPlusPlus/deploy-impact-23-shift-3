import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import getLanguages from "@/lib/getLanguages";

// Setting the delay function
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

interface Skill {
  url: string;
  language_name: string;
}

// managing state
export default function Asynchronous() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Skill[]>([]);
  const loading = open && options.length === 0;

  // Setting the logic for the asynchronous function on page reload
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let langauges_options = await getLanguages();

      if (active) {
        setOptions([...langauges_options]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Rendering our parameters on the DOM
  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        value === undefined ||
        option?.url?.toString() === (value?.url ?? value)?.toString()
      }
      getOptionLabel={(option) => option.language_name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
