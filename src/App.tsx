import { useState, useEffect, forwardRef } from "react";
import { Container, useTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import "./App.scss";

import { getUserData } from "./services/user/user.service";
import { IGithubUser } from "./services/user/user.model";
import { ISnackbarConfig } from "./interfaces";
import Search from "./components/Search";
import UserInfo from "./containers/UserInfo";
import AppHeader from "./containers/AppHeader";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const theme = useTheme();

  const containerStyle = {
    dark: {
      border: "1px solid #7f16c5",
      borderRadius: ".625rem",
      minHeight: "550px",
      backdropFilter: "blur(.625rem)",
      backgroundColor: "rgba(47, 47, 47 ,0.5)",
      boxShadow: "2px 2px 10px 0 #202020",
      p: "1rem",
    },
    light: {
      border: "1px solid #c277f5",
      borderRadius: ".625rem",
      minHeight: "550px",
      backdropFilter: "blur(.625rem)",
      backgroundColor: "rgba(255, 255, 255 ,0.4)",
      boxShadow: "2px 2px 10px 0 #7a7a7a",
      p: "1rem",
    },
  };

  const [userName, setUserName] = useState<string>("octocat");
  const [defaultData, setDefaultData] = useState<Partial<IGithubUser>>({});
  const [userData, setUserData] = useState<Partial<IGithubUser>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbar, setSnackbar] = useState<ISnackbarConfig>({
    open: false,
    message: "",
    severity: "success",
  });

  const getData = async (name: string): Promise<void> => {
    if (name === "") return;
    let defaultIsEmpty = Object.entries(defaultData).length === 0;
    if (name === "octocat" && !defaultIsEmpty) {
      setUserData(defaultData);
    } else {
      try {
        setLoading(true);
        const data = await getUserData(name);
        if (name === "octocat" && defaultIsEmpty) {
          setDefaultData(data);
        }
        setUserData(data);
        closeSnackbar();
      } catch (error: unknown) {
        if (error instanceof Error) {
          closeSnackbar();
          let errorMessage: string = "An error has ocurried";
          if (error.message) {
            errorMessage = error.message;
          }
          setSnackbar({
            open: true,
            message:
              error.cause === "Not Found"
                ? `User ${userName} not found`
                : errorMessage,
            severity: "error",
          });
          setUserData(defaultData);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData(userName);
  }, [userName]);

  const closeSnackbar = () => {
    setSnackbar((value) => {
      return { open: false, message: value.message, severity: value.severity };
    });
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    closeSnackbar();
  };

  return (
    <main className="App">
      <Container maxWidth="md" sx={{ mb: "1.5rem" }}>
        <AppHeader />
      </Container>
      <Container
        maxWidth="md"
        sx={
          theme.palette.mode === "dark"
            ? containerStyle.dark
            : containerStyle.light
        }
      >
        <Search value={userName} onChange={setUserName} />
        <UserInfo userData={userData} loading={loading} />
      </Container>

      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </main>
  );
}

export default App;
