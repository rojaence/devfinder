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

interface Props {}

function AppHeader(props: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
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
          value="dark"
          label="Theme"
          onChange={handleChange}
        >
          <MenuItem value={"light"}>
            <Stack direction="row" gap=".5rem">
              <LightModeIcon />
              <span>Light</span>
            </Stack>
          </MenuItem>
          <MenuItem value={"dark"}>
            <Stack direction="row" gap=".5rem">
              <DarkModeIcon />
              <span>Dark</span>
            </Stack>
          </MenuItem>
          <MenuItem value={"system"}>
            <Stack direction="row" gap=".5rem">
              <SettingsBrightnessIcon />
              <span>System</span>
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

export default AppHeader;
