import { IGithubUser } from "../services/user/user.model";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import "../styles/userInfo.scss";

type Props = {
  userData: Partial<IGithubUser>;
};

function UserInfo({ userData }: Props) {
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

  const stats = [
    {
      id: "stat-1",
      text: "Repos",
      value: userData.public_repos,
    },
    {
      id: "stat-2",
      text: "Followers",
      value: userData.followers,
    },
    {
      id: "stat-3",
      text: "Following",
      value: userData.following,
    },
  ];

  const social = [
    {
      id: "social-1",
      text: "Location",
      icon: <LocationOnIcon />,
      type: "text",
      value: userData.location || "Not available",
    },
    {
      id: "social-2",
      text: "Url",
      icon: <LinkIcon />,
      type: "link",
      value: userData.html_url,
      link: userData.html_url,
    },
    {
      id: "social-3",
      text: "Twitter",
      icon: <TwitterIcon />,
      type: "link",
      value: userData.twitter_username || "Not available",
      link: userData.twitter_username
        ? `https://twitter.com/${userData.twitter_username?.replace("@", "")}`
        : "",
    },
    {
      id: "social-4",
      text: "Company",
      icon: <ApartmentIcon />,
      type: "text",
      value: userData.company || "Not available",
    },
  ];

  return (
    <section className="user-info-container">
      <Box sx={{ gridArea: "profile", justifySelf: "center" }}>
        <CardMedia
          component="img"
          sx={{ borderRadius: "50%" }}
          image={userData.avatar_url}
          title="User avatar"
        />
      </Box>
      <Box sx={{ gridArea: "basicInfo", alignSelf: "center" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h1"
              sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              {userData.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h2" sx={{ fontSize: "1rem" }}>
              {`@${userData.login}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h2" sx={{ fontSize: "1rem" }}>
              {`Joined ${
                userData.created_at ? formatDate(userData.created_at) : ""
              }`}
            </Typography>
          </Grid>
        </Grid>
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
            <Box
              key={stat.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2">{stat.text}</Typography>
              <Typography variant="body1" fontWeight="bold">
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box sx={{ gridArea: "social" }}>
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
              <Stack direction="row" spacing={1} alignItems="center">
                {item.icon}
                {item.type === "link" && item.link ? (
                  <Link href={item.link} target="_blank" underline="none">
                    {item.value}
                  </Link>
                ) : (
                  <Typography variant="body1">{item.value}</Typography>
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
}

export default UserInfo;
