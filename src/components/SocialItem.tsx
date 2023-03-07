import { Stack, Link, Typography } from "@mui/material";
import { ISocialItem } from "../interfaces";

interface Props {
  data: Partial<ISocialItem>;
}

function SocialItem({ data }: Props) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {data.icon}
      {data.type === "link" && data.link ? (
        <Link href={data.link} target="_blank" underline="none">
          {data.value}
        </Link>
      ) : (
        <Typography variant="body1">{data.value}</Typography>
      )}
    </Stack>
  );
}

export default SocialItem;
