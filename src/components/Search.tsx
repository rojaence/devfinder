import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  return (
    <Stack direction="column">
      <TextField
        size="small"
        id="user-name"
        label="Github user name"
        variant="outlined"
        placeholder="For example: 'rojaence'"
        className={"c-text-field"}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Stack>
  );
}

export default Search;
