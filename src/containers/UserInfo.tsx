import { IGithubUser } from "../services/user/user.model";
import Grid from "@mui/material/Grid";

type Props = {
  userData: Partial<IGithubUser>;
};

function UserInfo({ userData }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {userData.name}
      </Grid>
      <Grid item xs={12}>
        {userData.bio ?? "No bio"}
      </Grid>
      <Grid item xs={12}>
        {userData.html_url}
      </Grid>
    </Grid>
  );
}

export default UserInfo;
