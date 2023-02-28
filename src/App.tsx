import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import "./App.scss";
import Search from "./components/Search";

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

  useEffect(() => {
    // TODO: request data
  }, [userName]);

  return (
    <main className="App">
      <Container maxWidth="lg" sx={containerStyle}>
        <Search value={userName} onChange={setUserName} />
      </Container>
    </main>
  );
}

export default App;
