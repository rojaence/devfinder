import { Box, Typography } from "@mui/material";
import { IStatItem } from "../interfaces";

interface Props {
  data: Partial<IStatItem>;
}

function StatItem({ data }: Props) {
  return (
    <Box
      key={data.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle2">{data.text}</Typography>
      <Typography variant="body1" fontWeight="bold">
        {data.value}
      </Typography>
    </Box>
  );
}

export default StatItem;
