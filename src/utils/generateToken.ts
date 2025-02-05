import axios from "axios";

export const generateToken = async (): Promise<string | null> => {
  // const URL = "https://aspiresys-ai-server.vercel.app";
  const URL =
    "https://auth.australia-southeast1.gcp.commercetools.com/oauth/token";
  // const tokenCredentials = {
  //   grant_type: "client_credentials",
  //   client_id: "tfegsSBVOYnR7e_yE-AjxVVN",
  //   client_secret: "pyKWgHuTxuMwDygh9JH1ehLEaLvAhBo4",
  // };

  const clientId = "tfegsSBVOYnR7e_yE-AjxVVN";
  const clientSecret = "pyKWgHuTxuMwDygh9JH1ehLEaLvAhBo4";

  // const authHeader =
  //   "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  // generateToken.ts (with browser-safe code)
  const authHeader =
    "Basic " +
    btoa(encodeURIComponent(clientId) + ":" + encodeURIComponent(clientSecret));

  try {
    const response = await axios.post(
      URL,
      new URLSearchParams({ grant_type: "client_credentials" }), // Only grant_type in body
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: authHeader,
        },
      }
    );

    // console.log("response", response);
    if (response.status === 200 && response.data.access_token) {
      return response.data.access_token;
    } else {
      console.error("Failed to fetch token:", response.data);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching token:", error.response || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};
