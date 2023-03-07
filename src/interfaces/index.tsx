import { AlertColor } from "@mui/material";

export enum SocialItemType {
  LINK = "link",
  TEXT = "text",
}

export interface ISearchInput {
  value: string;
  onChange: (val: string) => void;
}

export interface ISnackbarConfig {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export interface IStatItem {
  id: string | number;
  text: string;
  value: string | number;
}

export interface ISocialItem {
  id: string | number;
  text: string;
  icon: JSX.Element;
  type: SocialItemType;
  link: string;
  value: string;
}
