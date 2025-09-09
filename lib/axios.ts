import axios from "axios";

export const axiosAuthInstance = axios.create({
  baseURL: "https://intern-compass-1.onrender.com/auth",
  headers: {
    "Content-Type": "application/json",
  },
  //   headers: {
  //     Accept: "application/vnd.GitHub.v3+json",
  //     //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  //   },
});