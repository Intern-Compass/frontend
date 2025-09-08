import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://intern-compass-1.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
  //   headers: {
  //     Accept: "application/vnd.GitHub.v3+json",
  //     //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  //   },
});

export default axiosInstance;
