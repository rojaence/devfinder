import { useContext } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { ColorModeContext } from "../context/theme";
import { ColorMode } from "../constants";

interface Props {}

function AppHeader(props: Props) {
  const theme = useContext(ColorModeContext);

  const handleChange = (event: SelectChangeEvent) => {
    theme.toggleColorMode(event.target.value);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
    >
      <Typography variant="h1" fontSize="2rem" fontWeight="400">
        devfinder
      </Typography>
      <FormControl size="small">
        <InputLabel id="theme-color-mode">Theme</InputLabel>
        <Select
          labelId="theme-color-mode"
          id="theme-color-mode"
          value={theme.colorMode}
          label="Theme"
          onChange={handleChange}
        >
          <MenuItem value={ColorMode.Light}>
            <Stack direction="row" gap=".5rem">
              <LightModeIcon />
              <span>{ColorMode.Light}</span>
            </Stack>
          </MenuItem>
          <MenuItem value={ColorMode.Dark}>
            <Stack direction="row" gap=".5rem">
              <DarkModeIcon />
              <span>{ColorMode.Dark}</span>
            </Stack>
          </MenuItem>
          <MenuItem value={ColorMode.System}>
            <Stack direction="row" gap=".5rem">
              <SettingsBrightnessIcon />
              <span>{ColorMode.System}</span>
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

export default AppHeader;
