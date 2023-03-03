import { useState, useEffect } from "react";
import { Container, IconButton } from "@mui/material";
import "./App.scss";
import Search from "./components/Search";
import { getUserData } from "./services/user/user.service";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const containerStyle = {
    border: "1px solid #4B5E51",
    borderRadius: ".625rem",
    height: "600px",
    backdropFilter: "blur(.625rem)",
    backgroundColor: "rgba(47, 47, 47 ,0.5)",
    boxShadow: "2px 2px 10px 0 #202020",
    p: "1rem",
  };

  const [userName, setUserName] = useState("octocat");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "",
  });

  useEffect(() => {
    // REVIEW: request data
    const getData = async () => {
      if (loading) return;
      try {
        setLoading(true);
        const data = await getUserData(userName);
        console.log(data);
        closeSnackbar();
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.cause === "Not Found") {
            setSnackbar({
              open: true,
              message: `User ${userName} not found`,
              color: "var(--c-error-color)",
            });
          } else {
            setSnackbar({
              open: true,
              message: "An error occurred with the request",
              color: "var(--c-error-color)",
            });
          }
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [userName]);

  const closeSnackbar = () => {
    setSnackbar((value) => {
      return { open: false, message: "", color: value.color };
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

  const snackbarAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <main className="App">
      <Container maxWidth="lg" sx={containerStyle}>
        <Search value={userName} onChange={setUserName} />
      </Container>
    </main>
  );
}

export default App;
