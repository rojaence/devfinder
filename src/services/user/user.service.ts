import { IGithubUser } from "../user/user.model";
import { apiUrl } from "../../constants";

const getUserData = async (username: string): Promise<IGithubUser> => {
  const response = await fetch(`${apiUrl}/users/${username}`);
  const responseData = await response.json();
  if (!response.ok) {
    const errorData = responseData;
    throw new Error("Error ocurried", { cause: errorData.message });
  }
  const userData: IGithubUser = responseData;
  return userData;
};

export { getUserData };
