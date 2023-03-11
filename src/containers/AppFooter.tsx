import { Link, Box, Typography } from "@mui/material";

function AppFooter() {
  return (
    <Box component="footer" sx={{ mt: "1rem", textAlign: "center" }}>
      <Typography>
        <Typography>
          Coded by{" "}
          <Link
            target="_blank"
            underline="none"
            href="https://www.github.com/rojaence"
          >
            Ronny Endara
          </Link>
        </Typography>
      </Typography>
    </Box>
  );
}

export default AppFooter;
