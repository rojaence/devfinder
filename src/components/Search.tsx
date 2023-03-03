import { useState, KeyboardEvent, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { ISearchInput } from "../interfaces/index";
import Box from "@mui/material/Box";

function Search(props: ISearchInput) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (props.onChange) {
      props.onChange(inputValue);
    }
  };

  const boxStyle = {
    width: "37.5rem",
    maxWidth: "100%",
    margin: "0 auto",
  };

  return (
    <Box sx={boxStyle}>
      <TextField
        size="small"
        value={inputValue}
        onChange={handleChange}
        id="user-name"
        label="Github user name"
        fullWidth
        variant="outlined"
        onKeyDown={handleKeyDown}
        placeholder="octocat"
        className={"c-text-field"}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSubmit}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}

export default Search;
