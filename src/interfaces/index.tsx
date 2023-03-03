import { AlertColor } from "@mui/material";

export interface ISearchInput {
  value: string;
  onChange: (val: string) => void;
}

export interface ISnackbarConfig {
  open: boolean;
  message: string;
  severity: AlertColor;
}
