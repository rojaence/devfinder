import { Box, Divider, Grid, Skeleton, Stack } from "@mui/material";
import "../styles/userInfo.scss";

function UserInfoSkeleton() {
  return (
    <section className="user-info-container">
      <Box sx={{ gridArea: "profile", justifySelf: "center" }}>
        <Skeleton variant="circular" className="profile-skeleton" />
      </Box>
      <Box sx={{ gridArea: "basicInfo", alignSelf: "center" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rounded" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rounded" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rounded" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ gridArea: "bio" }}>
        <Skeleton variant="rounded" height={80} />
      </Box>
      <Box sx={{ gridArea: "stats" }}>
        <Stack
          direction="row"
          justifyContent="space-around"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          sx={{
            backgroundColor: "var(--c-card-bg)",
            borderRadius: 2,
            padding: "1rem .5rem",
          }}
        >
          <Skeleton variant="rounded" width="25%" height={40} />
          <Skeleton variant="rounded" width="25%" height={40} />
          <Skeleton variant="rounded" width="25%" height={40} />
        </Stack>
      </Box>
      <Box sx={{ gridArea: "social" }}>
        <Grid container columnSpacing={1} rowSpacing={2}>
          <Grid item direction="column" container xs={12} md={6}>
            <Skeleton variant="rounded" />
          </Grid>
          <Grid item direction="column" container xs={12} md={6}>
            <Skeleton variant="rounded" />
          </Grid>
          <Grid item direction="column" container xs={12} md={6}>
            <Skeleton variant="rounded" />
          </Grid>
          <Grid item direction="column" container xs={12} md={6}>
            <Skeleton variant="rounded" />
          </Grid>
        </Grid>
      </Box>
    </section>
  );
}

export default UserInfoSkeleton;
