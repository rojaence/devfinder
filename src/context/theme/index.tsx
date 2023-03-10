import { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorMode } from "../../constants";

const ColorModeContext = createContext({
  toggleColorMode: (value: string) => {},
  colorMode: "",
});

interface Props {
  children: JSX.Element;
}

function ColorModeProvider({ children }: Props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  let systemMode: string = localStorage.getItem("theme") || "system";
  let modeState: "light" | "dark" = "light";
  if (systemMode) {
    if (systemMode === ColorMode.System) {
      prefersDarkMode
        ? (modeState = ColorMode.Dark)
        : (modeState = ColorMode.Light);
    } else if (systemMode === ColorMode.Dark) {
      modeState = ColorMode.Dark;
    } else if (systemMode === ColorMode.Light) {
      modeState = ColorMode.Light;
    }
  } else {
    prefersDarkMode
      ? (modeState = ColorMode.Dark)
      : (modeState = ColorMode.Light);
  }

  const [mode, setMode] = useState<"light" | "dark">(modeState);
  const [userConfig, setUserConfig] = useState<string>(systemMode);

  const toggleTheme = (value: string) => {
    if (value === ColorMode.System) {
      prefersDarkMode ? setMode(ColorMode.Dark) : setMode(ColorMode.Light);
      setUserConfig(ColorMode.System);
      localStorage.setItem("theme", ColorMode.System);
    } else if (value === ColorMode.Light) {
      setMode(ColorMode.Light);
      setUserConfig(ColorMode.Light);
      localStorage.setItem("theme", ColorMode.Light);
    } else if (value === ColorMode.Dark) {
      setMode(ColorMode.Dark);
      setUserConfig(ColorMode.Dark);
      localStorage.setItem("theme", ColorMode.Dark);
    }
  };

  useEffect(() => {
    let themeValue = localStorage.getItem("theme");
    if (!themeValue) {
      prefersDarkMode ? setMode(ColorMode.Dark) : setMode(ColorMode.Light);
      localStorage.setItem("theme", ColorMode.System);
      setUserConfig(ColorMode.System);
    } else {
      toggleTheme(themeValue);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      toggleColorMode: (value: string) => {
        toggleTheme(value);
      },
      colorMode: userConfig,
    }),
    [userConfig]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundImage:
                mode === "light"
                  ? "var(--bg-gradient-light)"
                  : "var(--bg-gradient-dark)",
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export { ColorModeContext, ColorModeProvider };
