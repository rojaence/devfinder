import { IGithubUser } from "../services/user/user.model";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Skeleton,
  Typography,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import StatItem from "../components/StatItem";
import SocialItem from "../components/SocialItem";
import { ISocialItem, IStatItem, SocialItemType } from "../interfaces";

import "../styles/userInfo.scss";

interface Props {
  userData: Partial<IGithubUser>;
  loading: boolean;
}

function UserInfo({ userData, loading = true }: Props) {
  console.log(userData);

  const formatDate = (value: string) => {
    const dateValue = new Date(value);
    const format: string = dateValue.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return format;
  };

  const stats: Partial<IStatItem>[] = [
    {
      id: "stat-1",
      text: "Repos",
      value: userData.public_repos || 0,
    },
    {
      id: "stat-2",
      text: "Followers",
      value: userData.followers || 0,
    },
    {
      id: "stat-3",
      text: "Following",
      value: userData.following || 0,
    },
  ];

  const social: Partial<ISocialItem>[] = [
    {
      id: "social-1",
      text: "Location",
      icon: <LocationOnIcon />,
      type: SocialItemType.TEXT,
      value: userData.location,
    },
    {
      id: "social-2",
      text: "Url",
      icon: <LinkIcon />,
      type: SocialItemType.LINK,
      value: userData.html_url,
      link: userData.html_url,
    },
    {
      id: "social-3",
      text: "Twitter",
      icon: <TwitterIcon />,
      type: SocialItemType.LINK,
      value: userData.twitter_username,
      link: userData.twitter_username
        ? `https://twitter.com/${userData.twitter_username?.replace("@", "")}`
        : "",
    },
    {
      id: "social-4",
      text: "Company",
      icon: <ApartmentIcon />,
      type: SocialItemType.TEXT,
      value: userData.company,
    },
  ];

  return (
    <section className="user-info-container">
      <Box sx={{ gridArea: "profile", justifySelf: "center" }}>
        {!loading ? (
          <CardMedia
            component="img"
            sx={{ borderRadius: "50%" }}
            image={userData.avatar_url}
            title="User avatar"
          />
        ) : (
          <Skeleton variant="circular" className="profile-skeleton" />
        )}
      </Box>
      <Box sx={{ gridArea: "basicInfo", alignSelf: "center" }}>
        {!loading ? (
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h1"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                {userData.name || "No Data"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h2" sx={{ fontSize: "1rem" }}>
                {`@${userData.login || "nodata"}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h2" sx={{ fontSize: "1rem" }}>
                {userData.created_at &&
                  `Joined ${
                    userData.created_at ? formatDate(userData.created_at) : ""
                  }`}
              </Typography>
            </Grid>
          </Grid>
        ) : (
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
        )}
      </Box>
      <Box sx={{ gridArea: "bio" }}>
        <Typography variant="body1">
          {userData.bio
            ? userData.bio
            : userData.login === "octocat"
            ? "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."
            : "No bio available"}
        </Typography>
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
          {stats.map((stat) => (
            <StatItem key={stat.id} data={stat} />
          ))}
        </Stack>
      </Box>
      <Box sx={{ gridArea: "social" }}>
        {!loading ? (
          <Grid container columnSpacing={1} rowSpacing={2}>
            {social.map((item) => (
              <Grid
                item
                direction="column"
                container
                key={item.id}
                xs={12}
                md={6}
              >
                <SocialItem key={item.id} data={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          [1, 2, 3].map((item) => (
            <Grid
              key={`social-skeleton-${item}`}
              item
              direction="column"
              container
              xs={12}
              md={6}
            >
              <Skeleton variant="rounded" />
            </Grid>
          ))
        )}
      </Box>
    </section>
  );
}

export default UserInfo;
