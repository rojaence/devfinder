import { IGithubUser } from "../user/user.model";
import { apiUrl } from "../../constants";

interface IDataError {
  message: string;
  documentation_url: string;
}

const getUserData = async (
  username: string
): Promise<IGithubUser | IDataError> => {
  const response = await fetch(`${apiUrl}/users/${username}`);
  const responseData = await response.json();
  if (!response.ok) {
    const errorData: IDataError = responseData;
    throw new Error("Error ocurried", { cause: errorData.message });
  }
  const userData: IGithubUser = responseData;
  return userData;
};

export { getUserData };
